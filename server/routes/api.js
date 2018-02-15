const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const router = new express.Router();
const cors = require('cors');
const fs = require('file-system');
const S3FS = require('s3fs');
const AWS = require('aws-sdk');

const AWSsecret = process.env.AWS_SECRET_KEY;
const AWSid = process.env.AWS_ACCESS_KEY_ID;
const BucketName = process.env.S3_BUCKET;



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

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're logged in!"
  });
});

// THE 'PROJECTS' ROUTES ///

router.get('/projects', (req, res) => {
  Project.find((err, projects) => {
    if(err){ res.send(err) };

    res.status(200).json({ message: 'Projects retrieved',
    projects: projects });
  })
});

router.post('/projects', (req, res) => {
    User.findOne({ name: req.body.owner }, (err, owner) => {
      if (owner){
        const userData = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            documents: req.body.documents.trim(),
        }
        var project = new Project(userData);
        project.owner = owner._id

        project.save((err)=> {
            if (err){ res.send(err); }
            res.json({ message: 'Project created!', project: project, request: req.body });
        })
      }
      else {
        res.json(err)
      }
    })
});

/// THE "PROJECT/:ID" ROUTES ///

router.get('/project/:id', (req, res) => {
  var id = (req.params.id - 1);
  Project.find((err, projects)=> {
    if (err) { res.send(err) }
    if (projects[id]){
      var project = projects[id];
      res.json({ message: 'Fetch successful', project: project });
    }
    else {
      res.json({ message: 'Fetch unsuccessful' });
    }
  })
});

router.patch('/project/:id', (req, res) => {
  if (req.body.new_user) {
    User.findOne({ name: req.body.new_user }, (err, user) => {
      if (user) {
        Project.findOneAndUpdate({ _id: req.body._id}, { $push: { users: user }}, (err, project) => {
          if (err) { res.send(err) };
          res.status(200).json({ user_message: 'User successfully added.', form_stat: true, project: project, field:'user' });
        })
      }
      else {
        res.status(400).json({ user_message: 'Invalid user entry; check spacing / casing', form_stat: false, field:'user'});
      }
    })
  }
  else if (req.body.new_doc) {
    const validationResult = validateDocumentForm(req.body.new_doc)
    Project.findOneAndUpdate({ _id: req.body._id}, { $push: { documents: req.body.new_doc}}, (err, project) => {
      if (err) { res.send({err, form_stat: false }) };
      res.json({ doc_message: 'Document successfully added.', form_stat: true, project: project, field:'doc' });
    })
  }
  else {
    res.json({ doc_message: validateDocumentForm.errors,
               form_stat: false,
               field:'doc' })
  }
})

router.get('/project/:id/files', (req, res) => {
  var s3bucket = new AWS.S3({
    accessKeyId: AWSid,
    secretAccessKey: AWSsecret,
    Bucket: BucketName
  })
  s3bucket.createBucket(()=> {
    var params = {
      Bucket: BucketName,
      Key: req.body.name
    }
    s3bucket.getObject(params, function(err, data){
      if(err){
        console.log('Error in callback')
        console.log(err)
      }
      console.log('success')
      console.log(data)
      res.send({ msg: 'Successfully fetched files', obj: data })
    })
  })
})

router.post('/project/:id/files', (req, res) => {
  var file = req.body;
  var success = false;
  var s3bucket = new AWS.S3({
    accessKeyId: AWSid,
    secretAccessKey: AWSsecret,
    Bucket: BucketName
  });
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
  if (success == true){
    res.send({ msg: 'File successfully uploaded'})
  }
  else {
    res.send({ msg: 'Something went wrong...'})
  }
})

router.post('/users', cors(), (req, res) => {
  if (req) {
    var data = JSON.parse(Object.keys(req.body)[0])
    var id = data['_id']
    User.findOne({ _id: id}, (err, user) => {
      if (user){
        console.log(user)
        res.json({msg: 'Current User Retrieval Successful', user: user})
      }
    })
  }
  else {
    res.status(400)
  }
})



module.exports = router;
