import { Database } from '..';
import { IUser } from '../Interfaces';
import { HttpException } from '../../exceptions/HttpException';
import { ExceptionType } from '../../exceptions/exceptions.type';

export class UserDB extends Database {
  async create(data: IUser): Promise<IUser> {
    try {
      await this.pool.query('BEGIN');

      const { name, surname, email, pwd } = data;

      const query = {
        text: 'INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [name, surname, email, pwd],
      };

      const user: IUser = (await this.pool.query(query)).rows[0];
      await this.pool.query('COMMIT');

      return user;
    } catch (err) {
      // const error: DatabaseError = err;
      // logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_CREATE_NOT_CREATED);
    }
  }

  async getAll(): Promise<IUser[] | []> {
    try {
      const query = { text: 'SELECT * FROM users' };

      const user: IUser[] | [] = (await this.pool.query(query)).rows;

      return user;
    } catch (err) {
      // const error: DatabaseError = err;
      // logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_GET_ALL_NOT_GOT);
    }
  }

  async getById(id: string): Promise<IUser> {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE user_id = $1',
        values: [id],
      };

      const user: IUser = (await this.pool.query(query)).rows[0];

      return user;
    } catch (err) {
      // const error: DatabaseError = err;
      // logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_GET_BY_ID_NOT_GOT);
    }
  }

  async deleteById(id: string): Promise<IUser> {
    try {
      await this.pool.query('BEGIN');
      const query = {
        text: 'DELETE FROM users WHERE user_id = $1 RETURNING *',
        values: [id],
      };

      const user = await this.pool.query(query);
      await this.pool.query('COMMIT');

      return user;
    } catch (err) {
      // const error: DatabaseError = err;
      // logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_DELETE_NOT_DELETED);
    }
  }

  async updateById(id: string, data: IUser): Promise<IUser> {
    try {
      await this.pool.query('BEGIN');

      const queryForGet = {
        text: 'SELECT * FROM users WHERE user_id = $1',
        values: [id],
      };

      const foundUser: IUser = (await this.pool.query(queryForGet)).rows[0];
      if (!foundUser) throw new HttpException(404, ExceptionType.DB_USERS_NOT_FOUND);

      const { name, surname, email, pwd } = data;

      const query = {
        text: `UPDATE users SET name = $1, surname = $2, pwd = $3, email = $4 WHERE user_id = $5 RETURNING *`,
        values: [name, surname, email, pwd, id],
      };

      const user: IUser = (await this.pool.query(query)).rows[0];

      await this.pool.query('COMMIT');

      return user;
    } catch (err) {
      // const error: DatabaseError = err;
      // logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_USERS_UPDATE_NOT_UPDETED);
    }
  }
}
