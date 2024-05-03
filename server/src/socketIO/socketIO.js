let users = [];

const addUser = (user_info, socket_id) => {
  users = users.filter((user) => user.user_id !== user_info.user_id);
  user_info.socket_id = socket_id;
  users.push(user_info);
};

const getUser = (user_id) => {
  return users.find((user) => user.user_id === user_id);
};

const removeUser = (socket_id) => {
  users = users.filter((user) => user.socket_id !== socket_id);
};

function socketInit(io) {
  io.on("connection", (socket) => {
    socket.on("addUser", (user_id) => {
      addUser({ user_id }, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("borrow-book", (borrow_info) => {
      const { emp_id } = borrow_info;
      console.log(users);
      users.forEach((user) => {
        if (emp_id !== user.user_id) {
          io.to(user.socket_id).emit("borrow-book", { borrow_info });
        }
      });
    });

    socket.on("pay-fine", (pay_info) => {
      const { emp_id } = pay_info;
      users.forEach((user) => {
        if (emp_id !== user.user_id) {
          io.to(user.socket_id).emit("pay-fine", { pay_info });
        }
      });
    });

    // disconnect to server
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
}

module.exports = socketInit;
