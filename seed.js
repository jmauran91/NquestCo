//seed.js
var User = require('./server/models/user.js');

var user = {
    name: "John Mauran",
    email: "johnmauran1@gmail.com",
    role: "admin"
}

User.create(user, function(e) {
    if (e) {
        throw e;
    }
});
