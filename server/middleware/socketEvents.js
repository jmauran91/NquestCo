

exports = module.exports = (io) => {
  io.on('connection', (socket) => {


    /// HEART BEAT TO KEEP THE SOCKETS FROM DROPPING ////
    function sendHeartbeat(){
      setTimeout(sendHeartbeat, 8000);
      io.sockets.emit('ping', { beat: 1 });
    }

    socket.on('pong', (data) => {

    })
    setTimeout(sendHeartbeat, 8000);
    ///////////////////////////////////////////////////

    console.log('user connected')

    socket.on('enter conversation', (room_name) => {
      socket.join(room_name)
      io.sockets.in(room_name).emit('user joined', room_name)
      console.log('joined ' + room_name + ' ya?')
    })

    socket.on('leave conversation', (room_name) => {
      socket.leave(room_name)
      console.log('left ' + room_name)
    })

    socket.on('new message', (conversation) => {
      io.sockets.in(conversation.convo_id).emit('refresh messages', conversation);
    })

    socket.on('got message', (conversation) => {
      io.sockets.in(conversation).emit('message sent', conversation.user_id)
    })

    socket.on('enter chatbox', (chatbox_name) => {
      socket.join(chatbox_name)
      console.log('user joined chatbox ' + chatbox_name);
    })

    socket.on('leave chatbox', (chatbox_name) => {
      socket.leave(chatbox_name)
      console.log('user left chatbox ' + chatbox_name);
    })

    socket.on('new message chatbox', (chatbox) => {
      io.sockets.in(chatbox._id).emit('refresh chatbox', chatbox)
    })



    socket.on('disconnect', () => {
      console.log('user disconnected ')
    })
  })
}
