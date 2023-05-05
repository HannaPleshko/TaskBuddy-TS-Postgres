import { Response } from 'express';

type message = string;

export const buildResponse = (res: Response, status: number, message: message): void => {
  res.status(status);
  res.send(message);
};
