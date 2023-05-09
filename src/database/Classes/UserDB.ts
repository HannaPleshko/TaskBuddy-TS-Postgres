import { Database } from '..';
import { IUser } from '../Interfaces';

export class UserDB extends Database {
  async create(data: IUser): Promise<IUser> {
    await this.pool.query('BEGIN');

    const { name, surname, email, pwd } = data;

    const query = {
      text: 'INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [name, surname, email, pwd],
    };

    const user: IUser = (await this.pool.query(query)).rows[0];
    await this.pool.query('COMMIT');

    return user;
  }

  async getAll(): Promise<IUser[] | []> {
    const query = { text: 'SELECT * FROM users' };

    const user: IUser[] | [] = (await this.pool.query(query)).rows;

    return user;
  }

  async getById(id: string): Promise<IUser> {
    const query = {
      text: 'SELECT * FROM users WHERE user_id = $1',
      values: [id],
    };

    const user: IUser = (await this.pool.query(query)).rows[0];

    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    await this.pool.query('BEGIN');
    const query = {
      text: 'DELETE FROM users WHERE user_id = $1 RETURNING *',
      values: [id],
    };

    const user = await this.pool.query(query);
    await this.pool.query('COMMIT');

    return user.rowCount != 0 ? true : false;
  }

  async updateById(id: string, data: IUser): Promise<IUser> {
    await this.pool.query('BEGIN');

    const { name, surname, email, pwd } = data;

    const query = {
      text: `UPDATE users SET name = $1, surname = $2, pwd = $3, email = $4 WHERE user_id = $5 RETURNING *`,
      values: [name, surname, email, pwd, id],
    };

    const user: IUser = (await this.pool.query(query)).rows[0];

    await this.pool.query('COMMIT');

    return user;
  }
}
