import { Response } from 'express';
import { IUser, ISkill } from '@database/Interfaces/index';

type message = IUser | IUser[] | ISkill | ISkill[] | string;

export const buildResponse = (res: Response, status: number, message: message): void => {
  res.status(status);
  res.send(message);
};
