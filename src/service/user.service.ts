import { getUsersDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB } from '../repository/user.repository';
import { ExceptionType } from '../exceptions/exceptions.type';
import { HttpException } from '../exceptions/HttpException';

async function getUsers() {
  const users = await getUsersDB();
  return users;
}
async function getUserById(user_id) {
  const user = await getUserByIdDB(user_id);
  return user;
}
async function createUser(name, surname, email, pwd) {
  const user = await createUserDB(name, surname, email, pwd);
  return user;
}
async function updateUser(user_id, name, surname, email, pwd) {
  const user = await updateUserDB(user_id, name, surname, email, pwd);
  return user;
}
async function deleteUser(user_id) {
  const user = await deleteUserDB(user_id);
  return user;
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };
