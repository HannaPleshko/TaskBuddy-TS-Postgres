import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import { buildResponse } from '../helper/response';

class UserController {
  private userService = new UserService();

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      buildResponse(res, 200, await this.userService.getUsers());
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user_id } = req.params;
      buildResponse(res, 200, await this.userService.getUserById(user_id));
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.body;
      buildResponse(res, 201, await this.userService.createUser(user));
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user_id } = req.params;
      const user = req.body;
      buildResponse(res, 200, await this.userService.updateUser(user_id, user));
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user_id } = req.params;
      buildResponse(res, 200, await this.userService.deleteUser(user_id));
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
