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
      else if(conversations.length == 0){
        res.status(200).json({ message: 'no conversations for this user yet'})
      }
      else {
        let fullConversations = []
        conversations.forEach((conversation) => {
          Message.find({ conversationId: conversation._id})
          .sort('-createdAt')
          .limit(10)
          .populate({
            path: "author",
            select: "name"
          })
          .exec((err, messages) => {
            if(err){
              console.log(err)
              res.send({ err: err })
            }
            var message_arr = []
            messages.forEach((message) => {
              var message = message.toObject();
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
              message_arr.push(message)
            })

            fullConversations.push(message_arr)
            if(conversations.length == 0){
              res.status(200).json({ message: 'No conversations yet' })
            }
            else if(fullConversations.length === conversations.length){
              return res.status(200).json({ conversations_array: fullConversations })
              //// fullConversations is an array of conversations
              //// each conversation is an array of message objects
              //// each message object contains the text of the message
            }
          })
      })
    }
  })
})

router.get('/users/:id/conversation/:conv_id', (req,res) => {
  var _id = req.url.split('/')[2]
  var conv_id = req.url.split('/')[4]
  console.log(conv_id)
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
        res.status(200).json({ message: 'Conversation started!', conversation: newConvo })
    })
  })
})

router.patch('/users/:id/conversations/:conv_id', (req, res) => {
  var _id = req.url.split('/')[2]
  var conv_id = req.url.split('/')[4]
  if(req.body.body){
    var text = req.body.body;
  }
  else {
    var text = req.body.composedMessage
  }
  Message.findOne({ body: text }, (err, msg) => {
    if(msg){
      msg.isRead = true;
      msg.save((err) => {

        if(err){
          console.log(err)
        }
        console.log('message saved (isRead from false to true)')
        res.status(200).json({ message: 'Message successfully updated - isRead from false to true'})
      })
    }
    else {
      var message = new Message({
        conversationId: conv_id,
        body: req.body.composedMessage,
        author: _id
      })

      message.save((err, newMsg) => {
        if(err){
          console.log(err)
          res.send({ err: err })
        }

        res.status(200).json({ message: 'Reply successfully sent' })
      })
    }
  })
})


module.exports = router;
