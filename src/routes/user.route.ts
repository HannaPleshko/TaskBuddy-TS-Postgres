import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import UserController from '../controller/user.controller';

class UserRoute implements Routes {
  public path = '/user';

  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUserById);
    this.router.post(`${this.path}`, this.userController.createUser);
    this.router.patch(`${this.path}/:id`, this.userController.updateUser);
    this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
  }
}

export default UserRoute;