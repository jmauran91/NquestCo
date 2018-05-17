const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Project = require('./project');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  about: {
    type: String
  },
  profpic: String,
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
},
{
  timestamps: true
});

UserSchema.index({ firstName: 'text', lastName: 'text' })

UserSchema.methods.comparePassword = function comparePassword(password, callback){
  bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function saveHook(next){
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
