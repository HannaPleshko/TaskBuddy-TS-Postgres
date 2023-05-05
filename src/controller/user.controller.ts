import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../service/user.service';
import { buildResponse } from '../helper/response';

const route = express.Router();

route.get('/', async (req, res, next) => {
  try {
    buildResponse(res, 200, await getUsers());
  } catch (error) {
    next(error);
  }
});

route.get('/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;
    buildResponse(res, 200, await getUserById(user_id));
  } catch (error) {
    next(error);
  }
});

route.post('/', async (req, res, next) => {
  try {
    const { name, surname, email, pwd } = req.body;
    buildResponse(res, 201, await createUser(name, surname, email, pwd));
  } catch (error) {
    next(error);
  }
});

route.put('/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { name, surname, email, pwd } = req.body;
    buildResponse(res, 200, await updateUser(user_id, name, surname, email, pwd));
  } catch (error) {
    next(error);
  }
});

route.delete('/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;
    buildResponse(res, 200, await deleteUser(user_id));
  } catch (error) {
    next(error);
  }
});

export default route;
