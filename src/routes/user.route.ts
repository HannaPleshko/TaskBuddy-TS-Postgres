import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UserController from '@controllers/user.controller';

class UserRoute implements Routes {
  public path = '/user';

  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:user_id`, this.userController.getUserById);
    this.router.post(`${this.path}/registrate`, this.userController.createUser);
    this.router.post(`${this.path}/authenticate`, this.userController.authenticateUser);
    this.router.put(`${this.path}/:user_id`, this.userController.updateUser);
    this.router.delete(`${this.path}/:user_id`, this.userController.deleteUser);
  }
}

export default UserRoute;
