const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const path = require('path');
const dotenv = require('dotenv');
const busboy = require('connect-busboy');
const fileUpload = require('express-fileupload')
const fs = require('fs');


dotenv.config();

require('./server/models').connect(config.dbUri);

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(busboy())

app.use(express.static('./server/static/'));
app.use(express.static('./dist'))

app.use(passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);
app.use('/chat', authCheckMiddleware);

const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const chatRoutes = require('./server/routes/chat');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/chat', chatRoutes);

const adminRoutes = require('./server/routes/admin');
app.use('/admin/', adminRoutes)


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});


let server = app.listen(3000, () => {
  console.log('Server is running on localhost:3000');
})

const io = require('socket.io')(server, { 'transports': ['websocket', 'flashsocket' , 'polling']});
const socketEvents = require('./server/middleware/socketEvents')
socketEvents(io);
