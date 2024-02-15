import { User, UserInput } from "../types/user";

const users = [
  { id: 1, name: "John Doe", email: "johndoe@gmail.com" },
  { id: 2, name: "Jane Doe", email: "janedoe@gmail.com" },
  { id: 3, name: "Mike Doe", email: "mikedoe@gmail.com" },
];

const getUser = (args: { id: number }): User | undefined =>
  users.find((u) => u.id === args.id);

const getUsers = (): User[] => users;

const createUser = (args: { input: UserInput }): User => {
  const user = {
    id: users.length + 1,
    ...args.input,
  };
  users.push(user);

  return user;
};

const updateUser = (args: { user: User }): User => {
  const index = users.findIndex((u) => u.id === args.user.id);
  const targetUser = users[index];

  if (targetUser) users[index] = args.user;

  return targetUser;
};

const root = {
  getUser,
  getUsers,
  createUser,
  updateUser,
};

export default root;
