import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const id: number = error.id || 0;

    res.status(status).send({ id, message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
