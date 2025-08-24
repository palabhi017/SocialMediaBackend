const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle user joining
    socket.on("user_joined", (userId) => {
      console.log(`User ${userId} connected with socket ${socket.id}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
const emitToAll = (io, event, data) => {
  io.emit(event, data);
};

const emitToRoom = (io, room, event, data) => {
  io.to(room).emit(event, data);
};

export { emitToAll, emitToRoom, initializeSocket };
