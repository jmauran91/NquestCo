const User = require('mongoose').model('User');
const config = require('../../config')


module.exports = (req, res, next) => {
  if(req.headers.authorization){
    if(req.headers.authorization == "bearer adminrole"){
      return next();
    }
    else {
      return res.status(403).end();
    }
  }
  else {
      return res.status(403).end();
  }
};
