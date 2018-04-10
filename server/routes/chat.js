const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const Note = require('../models/note');
const File = require('../models/file');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const router = new express.Router();



//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


//// The Instant Messaging Routes ////////////////

router.get('/users/:id/conversations', (req,res) => {
  var _id = req.url.split('/')[2]
  Conversation.find({ participants: _id })
    .populate({
      path: "participants",
      select: "name"
    })
    .exec((err, conversations) => {
      if(err){
        console.log(err)
        res.send({err: err})
      }
      if(conversations.length == 0){
        res.status(200).json({ message: 'no conversations for this user yet'})
      }
      let fullConversations = []
      conversations.forEach((conversation) => {
        console.log('ping conv')
        Message.find({ conversationId: conversation._id})
        .sort('-createdAt')
        .limit(1)
        .populate({
          path: "author",
          select: "name"
        })
        .exec((err, message) => {
          if(err){
            console.log(err)
            res.send({ err: err })
          }
          var message = message[0].toObject();
          if(conversation.participants){
            if(conversation.participants.length == 2){
              if(message.author.name == conversation.participants[0].name){
                message.recipient = conversation.participants[1].name;
              }
              else {
                message.recipient = conversation.participants[0].name;
              }
            }
            else {
              var recipients = [];
              conversation.participants.forEach((recipient) => {
                recipients.push(recipient)
              })
              message.recipients = recipients
            }
          }
          fullConversations.push(message)
          if(conversations.length == 0){
            res.status(200).json({ message: 'No conversations yet' })
          }
          else if(fullConversations.length === conversations.length){
            return res.status(200).json({ conversations_array: fullConversations })
          }
        })
    })
  })
})

router.get('/users/:id/conversation/:conv_id', (req,res) => {
  var _id = req.url.split('/')[2]
  var conv_id = req.url.split('/')[4]
  Message.find({ conversationId: conv_id })
  .select('createdAt body author')
  .sort('-createdAt')
  .populate({
    path: 'author',
    select: 'name'
  })
  .exec((err, messages) => {
    if(err){
      res.send({ err: err })
    }
    console.log('is this being called?')
    console.log(messages)
    res.status(200).json({ conversation: messages })
  })
})

router.post('/users/:id/conversations', (req, res) => {
  var _id = req.url.split('/')[2]
  if(!req.body.recipient){
    res.status(422).send({ error: 'Please include a valid recipient for your conversation '})
  }

  if(!req.body.composedMessage){
    res.status(422).send({ error: 'Please include a message '})
  }

  console.log(_id)
  console.log(req.body.recipient)
  User.findOne({ name: req.body.recipient}, (err, user) => {
    var convoRecipients = [ _id, user._id ]
    var conversation = new Conversation({
      participants: convoRecipients
    });
    conversation.save((err, newConvo) => {
      if(err){
        console.log(err)
        res.send({ err: err })
      }
      console.log(newConvo)
      var message = new Message({
        conversationId: newConvo._id,
        body: req.body.composedMessage,
        author: _id
      })
      message.save((err, newMessage) => {
        if(err){
          console.log(err)
          res.send({ err: err })
        }
        res.status(200).json({ message: 'Conversation started!', conversation: newConvo })
      })
  })
  })
})

router.patch('/users/:id/conversations/:conv_id', (req, res) => {
  var _id = req.url.split('/')[2]
  var conv_id = req.url.split('/')[4]
  console.log(req.body)
  var reply = new Message({
    conversationId: req.body.convo_id,
    body: req.body.composedMessage,
    author: _id
  })

  reply.save((err) => {
    if(err){
      console.log(err)
      res.send({ err: err })
    }

    res.status(200).json({ message: 'Reply successfully sent' })
  })
})




module.exports = router;
