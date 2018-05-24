const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const Note = require('../models/note');
const File = require('../models/file');
const Ping = require('../models/ping');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const Chatbox = require('../models/chatbox');
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

function isArrEmpty(arr){
  if(arr){
    if (typeof arr !== 'undefined' && arr.length > 0) {
      return false
    // the array is defined and has at least one element
    }
    else {
      return true
    }
  }
  else {
    return true
  }
}

function isExist(obj){
  if(obj){
    if(typeof obj !== 'undefined' && obj.keys !== 'undefined'){
      return true
    }
    else {
      return false
    }
  }
  else {
    return false
  }

}


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

function createPing(u_id, p_id, body){
  var _ping = new Ping();
  _ping.userId = u_id;
  _ping.projectId = p_id;
  _ping.text = body;
  _ping.save((err, new_ping) => {
    if(err){
      console.log(err)
      return(null)
    }
    return(new_ping)
  })
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


//////////////////////////////////////////////////
///// THE SEARCH QUERIES APIS ////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////




router.get('/search/projects/:params', (req, res) => {
  var url_array = req.url.split("/")[3]
  url_array = url_array.split("+")
  var searchparams = url_array.join(" ")
  Project.find({ $text: { $search: searchparams } },
               { score: { $meta: "textScore"  } })
  .sort({ score: { $meta: "textScore"}})
  .limit(30)
  .exec((err, projects) => {
    if(err){
      console.log(err)
      res.status(400).json({ err: err })
    }
    else if(projects.length == 0){
      res.status(200).json({ msg: "Sorry, we couldn't find any results for this query" })
    }
    else {
      res.status(200).json({ projects: projects })
    }

  })
})

router.get('/search/users/:params', (req, res) => {
  var url_array = req.url.split("/")[3]
  url_array = url_array.split("+")
  var searchparams = url_array.join(" ")
  User.find({ $text: { $search: searchparams } },
            { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore"}})
  .limit(30)
  .exec((err, users) => {
    if(err){
      console.log(err)
      res.status(400).json({ err: err })
    }
    else if(users.length == 0){
      res.json({ msg: "Sorry, we couldn't find any results for this query" })
    }
    else {
      res.status(200).json({ users: users })
    }

  })
})



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
            if(result.pobject.owner == u_id || result.pobject.users.indexOf(u_id) > -1 ){
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
            console.log('pinging at error of addingNameToProject')
          })
        }
      })
    })
  }

  var updated_projects = [];
  addProjectToArr()
  .then((result) => {
    res.status(200).json({ msg: 'here are your projects', projects: result })
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
    User.findOne({ name: req.body.owner }, (err, user) => {
      if (user){
        ///// PREPARING THE VARIABLES
        try{
          var title = req.body.title;
          var owner = req.body.owner;
          var description = req.body.description;
          var filedata = req.files.file.data;
          var filename = req.files.file.name;
          var filetype = req.files.file.mimetype;
        }
        catch(error){
          console.log(error)
          res.status(400).json({ msg: 'You have not provided proper inputs'})
        }
        const userData = {
          title: title,
          description: description,
          documents: [filename],
          owner: user._id,
          ownername: user.firstName + " " + user.lastName
        }
        //// CREATE THE PROJECT
        var project = new Project(userData)
        ///// CREATE PROJECT CONNECTION WITH OWNER
        project.save().then(()=> {
          User.findOneAndUpdate({ _id: user._id }, { $push: { projects: project._id } }, (err, new_user) => {
            if(err){
              console.log(err)
            }
          })
          if (project.documents) {
            ///// NOW UPLOAD FILE TO S3 BUCKET
            createPing(project.owner, project._id, (project.ownername + " has created the project [" + project.title +"]"))
            uploadFile(filedata, filename, filetype)
            .then((result) => {
              ////// NOW CREATE FILE ENTRY IN DB
              var fileparams = {
                title: filename,
                project: project._id,
                body: result.Location
              }
              var newfile = new File(fileparams)
              newfile.save().then(() => {
                createPing(project.owner, project._id, (project.ownername + " has added a file to the project [" + project.title +"]"))
                res.json({ message: 'Project created!', project: project, request: req.body, result: result });
              })
            })
            .catch((err) => {
              console.log(err)
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
        console.log(err)
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
  Project.findOne({ _id: obj_id}, (err, project) => {
    if (err) {
      res.send(err)
      console.log(err)
    }
    if (isExist(project)){
      res.json({ message: 'project Fetch successful', project: project })
      console.log('sent project back to fetch')
    }
    else {
      res.json({ message: ' project Fetch unsuccessful' })
      console.log('sent back only message')
    }
  })
});


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.patch('/project/:id/revoke', (req, res) => {
  var _id = req.url.split('/')[2]
  var username = req.body.username
  User.findOne({ name: username }, (err, user) => {
    var options = {
      returnOriginal: false
    }
    Project.findOneAndUpdate({ _id: _id },
      { $pull: { usernames: user.name, users: user._id }}, {new: true}, (err, project) => {
      if(err){
        console.log(err)
        res.json({ msg: err })
      }
      console.log('this is to rmove a user')
      console.log(project)
      console.log('user has been removed?')
      res.status(200).json({
        msg: 'User revoked',
        project: project,
        form_stat: true,
        field: 'user',
        guest_usernames: project.usernames
       })
    })
  })
})

router.get('/project/:id/gu', (req, res) => {
  var _id = req.url.split('/')[2]
  console.log(req.url)
  Project.findOne({ _id: _id} , (err, project) => {
    if(err){
      console.log(err)
    }
    console.log(project)
    res.json({ guest_usernames: project.guest_usernames})
  })
})

router.patch('/project/:id', (req, res) => {

///// ADD A NEW USER TO THE PROJECT ////////
  if (req.body.new_user) {
    User.findOne({ name: req.body.new_user }, (err, user) => {
      if (user) {
        Project.findOneAndUpdate({ _id: req.body._id}, { $push: { users: user, usernames: req.body.new_user } }, {new: true}, (err, project) => {
          if (err) { res.send(err) };
          createPing(project.owner, project._id, (project.ownername + " has added a user to the project [" + project.title + "]"))
          console.log('this is to add a user')
          console.log(project)
          console.log('user has been added?')
          res.status(200).json({
            user_message: 'User permitted',
            form_stat: true,
            project: project,
            field: 'user',
            guest_usernames: project.usernames
          });
        })
      }
      else {
        res.status(400).json({
          user_message: 'Invalid user entry; check spacing / casing',
          form_stat: false,
          field:'user'
        });
      }
    })
  }

  else if (!req.body.new_user) {
    /////// THIS IS FOR ADDING FILES TO THE PROJECT / S3 ///////
    try{
      const filedata = req.files.file.data
      const filename = req.body.filename
      const filetype = req.files.file.mimetype
      ////// WE USE THIS CHUNK OF CODE
      // TO UPLOAD FILE TO S3 AND THEN
      // TO ADD RECORD TO DB BY WHICH TO RECALL IT
      Project.findOneAndUpdate({ _id: req.body._id}, { $push: { documents: filename}}, (err, project) => {
        // insert S3 Bucket Upload here
        uploadFile(filedata, filename, filetype).then((result) => {
          if (err) { res.send({err, form_stat: false }) };
          //// SAVING THE FILE NAME INTO THE PROJECT
          project.save((err) => {
            if(err) { res.send(err) }
            createPing(project.owner, project._id, (project.ownername + " has added a filename to the project [" + project.title + "]"))

            //// NOW SAVING THE FILE AS A DB ENTRY IN ITS OWN RIGHT
            var fileparams = {
              title: result.Key,
              project: project._id,
              body: `https://s3.amazonaws.com/rsearcherdockbucket/${result.Key}`
            }
            var newfile = new File(fileparams)
            newfile.save().then(() => {
              createPing(project.owner, project._id, (project.ownername + " has added a file to the project [" + project.title + "]"))
              res.json({ doc_message: 'File successfully added.', form_stat: true, project: project, field:'doc', file: newfile});
            })
          })
        })
        .catch((err) => {
          console.log('promise rejected')
          console.log(err)
        })
      })
    }
    catch(error){
      console.log(error)
    }
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

router.delete('/project/:id/files/:file_name', (req, res) => {
  var _id = req.url.split('/')[2]
  var file_name = req.url.split('/')[4]
  console.log(req.url)
  var file_n = decodeURIComponent(file_name)
  File.remove({ title: file_n }, (err) => {
    if(err){
      console.log(err)
      res.json({ msg: 'Failed to delete file ; ERROR'})
    }
    s3bucket.createBucket(() => {
      var params = {
        Bucket: BucketName,
        Delete: {
          Objects: [{
            Key: file_name
          }],
          Quiet: false
        }
      }
      s3bucket.deleteObjects(params, (err, data) => {
        if(err){
          console.log(err)
        }
        else {
          Project.findOneAndUpdate({ _id: _id}, { $pull: { documents: file_n }}, {new: true}, (err, project) => {
            if(err){
              console.log(err)
            }
            console.log(data)
            res.json({ msg: 'File deleted ', data: data, project: project })
          })
        }
      })
    })
  })
})

router.get('/project/:id/files', (req, res) => {
  var obj_id = req.url.split('/')[2];
  var server_doc_arr = []
  var res_files = [];

  function fetchFile(file, res_files){
    return new Promise((resolve, reject) => {
      if(file.indexOf("%") > -1){
        file = decodeURIComponent(file)
      }
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
          res.send(err)
        })
      }
    })
  }

  Project.findOne({ _id: obj_id}, (err, project) => {
    if(err){
      console.log(err)
      res.send(err)
    }
    if(!isExist(project)){
      res.status(400).send({ msg: "couldn't fetch" })
    }
    for ( var i = 0, len = project.documents.length; i < len; i++){
      var doc_title = project.documents[i];
      server_doc_arr.push(doc_title)
    }
    sortFiles().then((result) => {
      res.send({ msg: 'files fetch successful', files: result })
    })
    .catch((err) => {
      res.send({ msg: 'files fetch failed', err: err })
      console.log('failure')
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
        createPing(project.owner, project._id, (project.ownername + " has added a note to the project [" + project.title + "]"))

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
    res.send({ project: project })
  })
  // Exiting Project Callback Function
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

router.get('/project/:id/notes', (req, res) => {
  var _id = req.url.split('/')[2]
  function fetchNotes(){
    return new Promise((resolve, reject) => {
      Project.findOne({ _id: _id}, (err, project) => {
        if(err){
          console.log(err)
          reject(err)
        }
        var notes_arr = []
        if(isExist(project)){
          Note.find({ project: project._id }, (err, notes) => {
            if(err){
              console.log(err)
              reject(err)
            }
            resolve(notes)
          })
        }
        else {
          resolve('No notes')
        }
      })
    })
  }
  fetchNotes().then((notes) => {
    res.json({ msg: 'notes fetch successful', notes: notes })
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
  var bodyText = req.body.newtext
  Note.findOneAndUpdate({ _id: note_id }, {$set: { body: bodyText }}, {new: true})
  .populate('project')
  .exec((err, note) => {
    createPing(note.project.owner, note.project._id, (note.project.ownername + " has edited a note in the project [" + note.project.title + "]"))
    if(err){
      console.log(err)
      res.send(err)
    }
    res.send({ msg: 'note succesfully patched', note: note })
  })
})


router.delete('/project/:id/notes/:note_id', (req, res) => {
  var _id = req.url.split('/')[2]
  var note_id = req.url.split('/')[4]
  Note.findOne({ _id: note_id}, (err, note) => {
    Project.findOneAndUpdate({ id: _id}, { $pull: { notes: note.title} }, (err)=> {
      Note.remove({ _id: note_id}, (err, note) => {
        if(err){
          console.log(err)
          res.json({msg: 'Failed to delete ; ERROR'})
        }
        res.json({ msg: 'Note deleted'})
      })
    })
  })
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


//// GET USER

router.get('/users/:id', cors(), (req, res) => {
  var _id = req.url.split("/")[2]
  User.findOne({ _id: _id}, (err, user) => {
    if(err){
      console.log(err)
    }
    if (!isArrEmpty(user.projects)){
      var promise1 = new Promise((resolve, reject) => {
        Project.find({ ownername: user.name })
        .exec((err, owned_projects) => {
          if(err){
            console.log(err)
            reject()
          }
          if(owned_projects.length > 0){
            resolve(owned_projects)
          }
          else {
            resolve( [] )
          }
        })
      })
      var promise2 = new Promise((resolve, reject) => {
        Project.find({ usernames: user.name })
        .exec((err, guest_projects) => {
          if(err){
            console.log(err)
            reject()
          }
          if(guest_projects.length > 0){
            resolve(guest_projects)
          }
          else {
            resolve( [] )
          }
        })
      })

      Promise.all([promise1, promise2]).then((results) => {
        var userObj = user.toObject();
        if(isArrEmpty(results[0]) && isArrEmpty(results[1])){
          res.json({ msg: "User not currently working on any projects", user: userObj })
        }
        else if (isArrEmpty(results[0])) {
          userObj.guest_projects = results[1]
          res.json({ msg: "User contributes to projects", user: userObj })
        }
        else if (isArrEmpty(results[1])) {
          userObj.owned_projects = results[0]
          res.json({ msg: "User owns projects", user: userObj })
        }
        else {
          userObj.owned_projects = results[0]
          userObj.guest_projects = results[1]
          res.json({ msg: "User owns projects and contributes to others", user: userObj })
        }
      })
      .catch((err) => {
        res.json({ err })
      })
    }
    else {
      res.json({ user: user })
    }
  })
})

router.patch('/users/:id', cors(), (req, res) => {
  var _id = req.url.split("/")[2]
  if(isExist(req.files)){
    var edit;
    const filedata = req.files.file.data
    const filename = req.body.filename
    const filetype = req.files.file.mimetype

    User.findOne({ _id: _id}, (err, user) => {
      if(err){
        console.log(err)
        res.send(err)
      }
      if(typeof user.profpic === 'undefined' || !user.profpic){
        edit = false;
      }
      else {
        edit = true
      }
      uploadFile(filedata, filename, filetype).then((result) => {
        var url = `https://s3.amazonaws.com/rsearcherdockbucket/${result.Key}`

        user.profpic = url
        user.save((err) => {
          if(err){
            console.log(err)
            res.send(err)
          }
          if(edit == true){
            res.status(200).json({ msg: "Prof pic successfully edited "})
          }
          else {
            res.status(200).json({ msg: "Prof pic successfully added "})
          }
        })
      })
      .catch((err) => {
        console.log(err)
        res.json({err})
      })
    })
  }
  else if (req.body.about){
    var new_about = req.body.about
    User.findOneAndUpdate({ _id: _id }, { $set: { about: new_about } }, (err, new_user) => {
      if(err){
        console.log(err)
      }
      res.status(200).json({ msg: 'User AboutMe edited', new_about: new_user.about })
    })
  }
  else {
    res.status(400).json({ msg: 'Inputs not recognized'})
  }
})

router.get('/users', cors(), (req,res) => {
  var id = req.url.split("/")[2]
  User.find((err, users) => {
    if(err){
      res.status(404).send(err)
    }
    res.json({ users: users })
  })
})

router.get('/users/:user_id/pings', (req, res) => {
  var url = req.url.split('/')[2]
  Ping.find({ userId: url })
    .populate({
      path: 'userId',
      select: 'name'
    })
    .populate({
      path: 'projectId',
      select: ['title', 'ownername', 'usernames']
    })
    .exec((err, pings) => {
      if(err){
        console.log(err)
        res.send(err)
      }
      res.status(200).json({ msg: 'pings fetched', pings: pings })
    })
})

router.get('/project/:id/pings', (req, res) => {
  var _id = req.url.split('/')[2]
  Ping.find({ projectId: _id})
    .populate({
      path: 'projectId'
    })
    .exec((err, pings) => {
      if(err){
        console.log('Error')
        console.log(err)
        res.status(400).json({
          msg: "Error in finding project pings"
        })
      }
      res.status(200).json({
        msg: "Project pings fetched",
        pings: pings
      })
    })

})

router.get('/project/:id/chatbox', (req, res) => {
  var p_id = req.url.split('/')[2]
  Chatbox.findOne({ project: p_id }, (err, chatbox) => {
    if(err){
      console.log(err)
      res.status(400).send({ msg: 'Failed to fetch Chatbox' })
    }
    res.status(200).json({
      msg: 'Successfully fetched chatbox',
      chatbox: chatbox
    })
  })
})

router.patch('/project/:id/chatbox', (req, res) => {
  var p_id = req.url.split('/')[2]
  var req_messages = req.body.map((msg) => {
    return(
      msg.createdAt + " " + msg.username + ": " + msg.composedMessage
    )
  })
  Chatbox.findOneAndUpdate(
    { project: p_id },
    { $set: { messages: req_messages }},
    { upsert: true, new: true },
    (err, chatbox) => {
    if(err){
      console.log('hit the err')
      console.log(err)
    }
    res.status(200).json({
      msg: 'Chatbox successfully updated / created',
      chatbox: chatbox
    })
  })
})

module.exports = router;
