const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const Note = require('../models/note');
const File = require('../models/file');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const stream = require('stream');
const cors = require('cors');
const fs = require('fs');
const Busboy = require('connect-busboy');
const mongoose = require('mongoose');
const S3FS = require('s3fs');
const AWS = require('aws-sdk');
const Promise = require('bluebird');
const router = new express.Router();
const AWSsecret = process.env.AWS_SECRET_KEY;
const AWSid = process.env.AWS_ACCESS_KEY_ID;
const BucketName = process.env.S3_BUCKET;


var s3bucket = new AWS.S3({
  accessKeyId: AWSid,
  secretAccessKey: AWSsecret,
  Bucket: BucketName,
  region: 'us-east-1'
});


function validateDocumentForm(payload){
  const errors = '';
  let isFormValid = true;
  let message = '';

  if (!payload || !payload.split('.')[1]) {
    isFormValid = false;
    errors = 'You must enter correct file with file extension';
  }

  return {
    success: isFormValid,
    errors
  }
}

function uploadFile(filedata, filename, filetype){
  return new Promise((resolve, reject) => {
    s3bucket.createBucket(() => {
      var data = {
        Bucket: BucketName,
        Key: filename,
        Body: filedata,
        ContentType: filetype,
        Expires: 60,
        ACL: 'public-read'
      }
      s3bucket.upload(data, function(err, data){
        if(err){
          console.log('s3 bucket upload failure')
          console.log(err)
          reject(err)
        }
        else {
          console.log('s3 bucket upload')
          console.log(data)
          resolve(data)
        }
      });
    });
  });
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're logged in!"
  });
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


// THE 'PROJECTS' ROUTES ///

router.get('/:id/projects', (req, res) => {

  var u_id = req.url.split('/')[1]

  function validateOwnerName(currentProject){
    return currentProject.owner_name instanceof String
  }

  function addNameToProject(project, i){
    return new Promise((resolve, reject) => {
      User.findOne({ _id: project.owner}, (err, owner) => {
        var pobject = project.toObject();
        pobject.owner_name = owner.name
        var promise_res = {}
        promise_res.pobject = pobject
        promise_res.i = i
        // Passing Two Key Variables into an Object
        // So they're accessible in the next promise
        resolve(promise_res)
      })
    })
  }

  function addProjectToArr(){
    return new Promise((resolve, reject) => {
      Project.find((err, projects) => {
        if(err){res.send(err)}
        for (var i = 0, len = projects.length; i < len; i++){
          var pj = projects[i]
          addNameToProject(pj, i)
          .then((result) => {
            console.log(result.i)
            if(result.pobject.owner == u_id || result.pobject.users.indexOf(u_id) > -1 ){
              console.log(result.pobject.owner)
              updated_projects.push(result.pobject)
              if( result.i == projects.length - 1 ) {
                resolve(updated_projects)
              }
            }
            else if ( result.i == projects.length - 1 ) {
              reject()
            }
          })
          .catch((err) => {
            console.log('ping1')
          })
        }
      })
    })
  }

  var updated_projects = [];
  addProjectToArr()
  .then((result) => {
    console.log(result)
    res.status(200).json({ msg: 'we did something', projects: result })
  })
  .catch((err) => {
    res.json({ msg: " ... You don't currently have any projects ... ", projects: err})
  })
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.post('/projects', (req, res) => {
  console.log('enter api')
    User.findOne({ name: req.body.owner }, (err, user) => {
      if (user){
        console.log('owner found')
        ///// PREPARING THE VARIABLES
        const title = req.body.title;
        const owner = req.body.owner;
        const description = req.body.description;
        const filedata = req.files.file.data;
        const filename = req.files.file.name;
        const filetype = req.files.file.mimetype;

        const userData = {
          title: title,
          description: description,
          documents: [filename]
        }
        //// CREATE THE PROJECT
        var project = new Project(userData)
        ///// CREATE PROJECT CONNECTION WITH OWNER
        project.owner = user._id
        project.ownername = user.name

        project.save().then(()=> {
          console.log('project saved')
          if (project.documents) {
            ///// NOW UPLOAD FILE TO S3 BUCKET
            uploadFile(filedata, filename, filetype)
            .then((result) => {
              console.log('file uploaded')
              ////// NOW CREATE FILE ENTRY IN DB
              var fileparams = {
                title: filename,
                project: project._id,
                body: result.Location
              }
              var newfile = new File(fileparams)
              newfile.save().then(() => {
                console.log('file saved')
                res.json({ message: 'Project created!', project: project, request: req.body, result: result });
              })
            })
            .catch((err) => {
              res.json({ message: 'Failed to Upload File', project: project})
            })
          }
          else {
            res.json({ message: 'Project created without file', project: project });
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
      else {
        res.json(err)
      }
    })
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


/// THE "PROJECT/:ID" ROUTES ///

router.get('/project/:id', (req, res) => {
  var obj_id = req.url.split('/')[2]
  try{
    console.log('this is user ' + req.user)
  }
  catch(err){
    console.log(err)
  }
  Project.findOne({ _id: obj_id}, (err, project) => {
    if (err) { res.send(err) }
    if (project){
      res.json({ message: 'project Fetch successful', project: project, url: req.url });
    }
    else {
      res.json({ message: ' project Fetch unsuccessful' });
    }
  })
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.patch('/project/:id', (req, res) => {

///// ADD A NEW USER TO THE PROJECT ////////
  if (req.body.new_user) {
    User.findOne({ name: req.body.new_user }, (err, user) => {
      if (user) {
        Project.findOneAndUpdate({ _id: req.body._id}, { $push: { users: user, usernames: req.body.new_user } }, (err, project) => {
          if (err) { res.send(err) };
          project.save((err)=> {
            if(err) { res.send(err) }
            res.status(200).json({ user_message: 'User successfully added.', form_stat: true, project: project, field:'user' });
          })
        })
      }
      else {
        res.status(400).json({ user_message: 'Invalid user entry; check spacing / casing', form_stat: false, field:'user'});
      }
    })
  }

  else if (!req.body.new_user) {
    /////// THIS IS FOR ADDING FILES TO THE PROJECT / S3 ///////
    console.log(req.body)
    console.log(req.files)

    const filedata = req.files.file.data
    const filename = req.body.filename
    const filetype = req.files.file.mimetype
    ////// WE USE THIS CHUNK OF CODE
    // TO UPLOAD FILE TO S3 AND THEN
    // TO ADD RECORD TO DB BY WHICH TO RECALL IT
    Project.findOneAndUpdate({ _id: req.body._id}, { $push: { documents: filename}}, (err, project) => {
      // insert S3 Bucket Upload here
      uploadFile(filedata, filename, filetype).then((result) => {
        console.log('after promise')
        console.log(result)
        if (err) { res.send({err, form_stat: false }) };
        //// SAVING THE FILE NAME INTO THE PROJECT
        project.save((err) => {
          if(err) { res.send(err) }
          //// NOW SAVING THE FILE AS A DB ENTRY IN ITS OWN RIGHT
          var fileparams = {
            title: result.Key,
            project: project._id,
            body: `https://s3.amazonaws.com/rsearcherdockbucket/${result.Key}`
          }
          var newfile = new File(fileparams)
          newfile.save().then(() => {
            res.json({ doc_message: 'Document successfully added.', form_stat: true, project: project, field:'doc', file: newfile});
          })
        })
      })
      .catch((err) => {
        console.log('promise rejected')
        console.log(err)
      })
    })
  }
  else {
    res.send({
               doc_message: 'hmm...',
               form_stat: false,
               field:'doc',
               request: req.body
             })
  }
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.get('/project/:id/files', (req, res) => {
  var obj_id = req.url.split('/')[2];
  var server_doc_arr = []
  var res_files = [];

  function fetchFile(file, res_files){
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: BucketName,
        Key: file,
      }
      s3bucket.getObject(params, (err, obj) => {
        if (err) { reject(err); }
        if (obj) {
          obj["name"] = file
          res_files.push(obj)
        }
        resolve(res_files);
      })
    })
  }

  function sortFiles(){
    return new Promise((resolve, reject) => {
      for ( var i = 0; i < server_doc_arr.length; i++ ){
        var filename_get = server_doc_arr[i]
        fetchFile(filename_get, res_files)
        .then((result) => {
          if (server_doc_arr.length == res_files.length) {
            resolve(res_files);
          }
        })
        .catch((err) => {
          console.log(err)
          console.log('error happened after fetch file')
        })
      }
    })
  }

  Project.findOne({ _id: obj_id}, (err, project) => {
    for ( var i = 0, len = project.documents.length; i < len; i++){
      var doc_title = project.documents[i];
      server_doc_arr.push(doc_title)
    }
    sortFiles().then((result) => {
      console.log('success')
      res.send({ msg: 'files fetch successful', files: result })
    })
    .catch((err) => {
      console.log('failure')
      res.send({ msg: 'files fetch failed', err: err })
    })

  });
})


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


router.post('/project/:id/files', (req, res) => {
  var file = req.body;
  var url = req.url.split('/')[2]
  var success = false;
  s3bucket.createBucket(() => {
    var params = {
      Bucket: BucketName,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function(err, data){
      if(err){
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
      success = true;
    });
  });
  var newfile = new File()
  if (success == true){
    res.send({ msg: 'File successfully uploaded'})
  }
  else {
    res.send({ msg: 'Something went wrong...'})
  }
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.patch('/project/:id/note', (req, res) => {
  var _id = req.url.split('/')[2]
  Project.findOneAndUpdate({ _id: _id}, {$push : { notes: req.body.title }}, (err, project) => {
    User.findOne({ _id: project.owner }, (err, user) => {
      var noteData = {
        title: req.body.title.trim(),
        body: req.body.note.trim(),
        project: project,
        owner: user,
      }
      var newNote = new Note(noteData)
      newNote.save((err) => {
        if(err){
          console.log(err)
        }
      })
      // Exiting newNote Save
      if(err){
        console.log(err)
      }
    })
    // Exiting User Callback Function
    if (err) {
      console.log(err)
    }
    console.log(project)
    res.send({ project: project })
  })
  // Exiting Project Callback Function
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.get('/project/:id/notes', (req, res) => {
  console.log('note get')
  var _id = req.url.split('/')[2]
  function fetchNotes(){
    return new Promise((resolve, reject) => {
      Project.findOne({ _id: _id}, (err, project) => {
        if(err){
          console.log(err)
          reject(err)
        }
        var notes_arr = []
        console.log('project found')
        if(project.notes[0]){
          for (var i = 0; i < project.notes.length; i++){
            Note.findOne({ title : project.notes[i] }, (err, note) => {
              notes_arr.push(note)
              console.log('at the if')
              if(notes_arr.length == project.notes.length){
                console.log('in the if')
                resolve(notes_arr)
              }
            })
          }
        }
        else {
          resolve('No notes')
        }
      })
    })
  }
  fetchNotes().then((result) => {
    console.log(result)
    res.json({ msg: 'notes fetch successful', notes: result })
  })
  .catch((err) => {
    console.log(err)
    res.json({ msg: 'notes fetch unsuccessful', err: err})
  })
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.patch('/project/:id/notes/:note_id', (req, res) => {
  var _id = req.url.split('/')[2]
  var note_id = req.url.split('/')[4]
  Note.findOneAndUpdate({ _id: note_id },
            {$set: { body: req.body.newtext }}, (err, note) => {
    if(err){
      console.log(err)
      res.send(err)
    }
    res.send({ msg: 'note succesfully patched', note: note })
  })
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


router.get('/users/:id', cors(), (req, res) => {
  var id = req.url.split("/")[2]
  User.findOne({ _id: id}, (err, user) => {
    if (user){
      res.json({msg: 'Current User Retrieval Successful', user: user})
    }
    else {
      res.status(400)
    }
  })
})

router.get('/users', cors(), (req,res) => {
  var id = req.url.split("/")[2]
  User.find((err, users) => {
    if(err){
      res.status(404).send(err)
    }
    res.json({ users: users })
    console.log('users fetched')
  })
})

module.exports = router;
