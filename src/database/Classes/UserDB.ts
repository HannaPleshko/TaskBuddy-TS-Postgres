import { Database } from '..';
import { IUser } from '../Interfaces';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionType } from '@exceptions/exceptions.type';
import { logger } from '@utils/logger';
import { DatabaseError } from 'pg';

export class UserDB extends Database {
  async create(data: IUser): Promise<IUser[]> {
    try {
      await this.pool.query('BEGIN');

      const { name, surname, email, pwd } = data;

      const query = {
        text: 'INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [name, surname, email, pwd],
      };

      const user: IUser[] = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return user;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_CREATE_NOT_CREATED);
    }
  }

  async getAll(): Promise<IUser[]> {
    try {
      const query = { text: 'SELECT * FROM users' };

      const user: IUser[] = (await this.pool.query(query)).rows;
      if (!user.length) throw new HttpException(404, ExceptionType.DB_USERS_NOT_FOUND);

      return user;
    } catch (err) {
      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_GET_ALL_NOT_GOT);
    }
  }

  async getById(user_id: string): Promise<IUser[]> {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE user_id = $1',
        values: [user_id],
      };

      const user: IUser[] = (await this.pool.query(query)).rows;
      if (!user.length) throw new HttpException(404, ExceptionType.DB_USERS_NOT_FOUND);

      return user;
    } catch (err) {
      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_GET_BY_ID_NOT_GOT);
    }
  }

  async deleteById(user_id: string): Promise<IUser[]> {
    try {
      await this.pool.query('BEGIN');
      const query = {
        text: 'DELETE FROM users WHERE user_id = $1 RETURNING *',
        values: [user_id],
      };

      const user: IUser[] = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return user;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_DELETE_NOT_DELETED);
    }
  }

  async updateById(user_id: string, data: IUser): Promise<IUser[]> {
    try {
      await this.pool.query('BEGIN');

      const queryForGet = {
        text: 'SELECT * FROM users WHERE user_id = $1',
        values: [user_id],
      };

      const foundUser: IUser[] = (await this.pool.query(queryForGet)).rows;
      if (!foundUser.length) throw new HttpException(404, ExceptionType.DB_USERS_NOT_FOUND);

      const { name, surname, email, pwd } = data;

      const query = {
        text: `UPDATE users SET name = $1, surname = $2, pwd = $3, email = $4 WHERE user_id = $5 RETURNING *`,
        values: [name, surname, email, pwd, user_id],
      };

      const user: IUser[] = (await this.pool.query(query)).rows;

      await this.pool.query('COMMIT');

      return user;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_UPDATE_NOT_UPDETED);
    }
  }
}
