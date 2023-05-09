import { Response } from 'express';
import { IUser } from '../database/Interfaces/index';

type message = string | boolean | IUser | IUser[];

export const buildResponse = (res: Response, status: number, message: message): void => {
  res.status(status);
  res.send(message);
};
