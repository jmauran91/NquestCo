const mongoose = require('mongoose');
const User = require('./user');

const ConversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

})

module.exports = mongoose.model('Conversation', ConversationSchema)
