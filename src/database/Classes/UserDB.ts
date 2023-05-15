import { Database } from '..';
import { IUser } from '../Interfaces';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionType } from '@exceptions/exceptions.type';
import { logger } from '@utils/logger';
import { DatabaseError } from 'pg';

export class UserDB extends Database {
  async create(data: IUser): Promise<void> {
    try {
      await this.pool.query('BEGIN');

      const { name, surname, email, pwd } = data;

      const query = {
        text: 'INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4)',
        values: [name, surname, email, pwd],
      };

      await this.pool.query(query);
      await this.pool.query('COMMIT');
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

  async getByEmail(email: string): Promise<IUser | null> {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
      };

      const user = (await this.pool.query(query)).rows;

      return user.length ? user[0] : null;
    } catch (err) {
      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USER_GET_BY_EMAIL_NOT_GOT);
    }
  }

  async deleteById(user_id: string): Promise<void> {
    try {
      await this.pool.query('BEGIN');
      const query = {
        text: 'DELETE FROM users WHERE user_id = $1',
        values: [user_id],
      };

      await this.pool.query(query);
      await this.pool.query('COMMIT');
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_DELETE_NOT_DELETED);
    }
  }

  async updateById(user_id: string, data: IUser): Promise<void> {
    try {
      await this.pool.query('BEGIN');

      const { name, surname, email, pwd } = data;

      const query = {
        text: `UPDATE users SET
        name = COALESCE($1, name),
        surname = COALESCE($2, surname),
        email = COALESCE($3, email),
        pwd = COALESCE($4, pwd)
        WHERE user_id = $5`,
        values: [name, surname, email, pwd, user_id],
      };

      await this.pool.query(query);

      await this.pool.query('COMMIT');
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_UPDATE_NOT_UPDETED);
    }
  }
}
