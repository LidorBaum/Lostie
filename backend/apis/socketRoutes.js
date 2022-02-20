module.exports = connectSockets;

function connectSockets(io) {
    console.log('i m in sockets');
    io.on('connection', socket => {
        socket.on('dashboard', data => {
            socket.join(data);
        });

        socket.on('update_dashboard', ({ orderId }) => {
            socket.to(orderId).emit('update_dashboard', { orderId });
        });
    });
}
