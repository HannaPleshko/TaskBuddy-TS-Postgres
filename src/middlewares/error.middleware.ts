import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import HttpExceptionJSON from '@exceptions/HttpExceptions.json';

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const id: number = error.id || 0;

    res.status(status).send({ id, message });
  } catch (error) {
    next(error);
  }
};

export const getAllErrors = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.stringify(HttpExceptionJSON));
    res.status(200);

    next();
  } catch (err) {
    next(err);
  }
};
