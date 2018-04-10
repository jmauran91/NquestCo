


exports = module.exports = (io) => {
  io.on('connection', (socket) => {
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

    socket.on('disconnect', () => {
      console.log('user disconnected ')
    })
  })
}
