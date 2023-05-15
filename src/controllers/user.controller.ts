import { Request, Response, NextFunction } from 'express';
import { UserService } from '@services/user.service';
import { buildResponse } from '@helper/response';
import { SuccessfullyType } from '@exceptions/exceptions.type';

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
      await this.userService.createUser(user);
      buildResponse(res, 201, SuccessfullyType.DB_USER_SUCCESS_REGISTRATE);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user_id } = req.params;
      const user = req.body;
      await this.userService.updateUser(user_id, user);
      buildResponse(res, 200, SuccessfullyType.DB_USER_SUCCESS_CHANGE_CREDENTIALS);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user_id } = req.params;
      await this.userService.deleteUser(user_id);
      buildResponse(res, 200, SuccessfullyType.DB_USER_SUCCESS_DELETE_USER);
    } catch (error) {
      next(error);
    }
  };

  authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.body;
      await this.userService.authenticateUser(user);
      buildResponse(res, 200, SuccessfullyType.DB_USER_SUCCESS_AUTHENTICATE);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
