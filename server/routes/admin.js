const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const Note = require('../models/note');
const File = require('../models/file');
const Ping = require('../models/ping');
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

router.delete('/projects', (req,res) => {
  Project.remove({}, (err) => {
    if(err){
      console.log
    }
    res.json({ msg: 'All projects deleted '})
  })
})

router.delete('/files', (req, res) => {
  File.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    res.json({ msg: 'All files deleted '})
  })
})

router.delete('/notes', (req, res) => {
  Note.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    res.json({ msg: 'All notes deleted '})
  })
})

router.delete('/pings', (req, res) => {
  Ping.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    res.json({ msg: 'All pings deleted '})
  })
})

router.delete('/pings', (req, res) => {
  Ping.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    res.json({ msg: 'All pings deleted '})
  })
})

router.delete('/convos', (req, res) => {
  Conversation.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    res.json({ msg: 'All conversations deleted '})
  })
})

router.delete('/users/:id/conversations', (req, res) => {
  var _id = req.url.split("/")[3]
  User.findOne({ _id: _id}, (err, user) => {
    if(err){
      console.log(err)
    }
    user.conversations = [];
    user.save((err, new_user) => {
      if(err){
        console.log(err)
      }
      res.json({ msg: 'Conversations for this user deleted', user: new_user })
    })
  })
})

router.delete('/users', (req, res) => {
  User.remove({}, (err, users) => {

    /////// PREVENT THE ADMIN FROM GETTING DELETED HERE

    if(err){
      console.log(err)
    }
    res.json({ msg: 'Users deleted'})

  })
})

router.delete('/users', (req, res) => {
  Project.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    res.json({ msg: 'Projects deleted' })
  })
})


router.delete('/messages', (req, res) => {
  Message.remove({}, (err) => {
    if(err){
      console.log(err)
    }
    res.json({ msg: 'Messages deleted' })

  })
})

module.exports = router;
