const users = [];

const addUser = ({ id, name, room, photo }) => {
  name = name.trim();
  room = room.trim().toLowerCase();
  let password = "111";

  const existingUser = users.find(
    (user) => user.room === room && password == "111"
  );

  const user = { id, name, room, photo };

  if (!password || !room)
    return { error: "Room name and password are required!" };

  if (password != "111")
    return { error: "Wrong password for room! Please, try again later!" };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
