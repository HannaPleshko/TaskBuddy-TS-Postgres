import { Pool } from 'pg';
import { defaultPool } from '../connection';
import { HttpException } from '../../exceptions/HttpException';
import { ExceptionType } from '../../exceptions/exceptions.type';

export const createTables = async (pool: Pool = defaultPool): Promise<void> => {
  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    await client
      .query(
        `
        CREATE TABLE IF NOT EXISTS users (
          user_id     UUID DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID,
          name        VARCHAR(20), 
          surname     VARCHAR(30), 
          email       VARCHAR(40), 
          pwd         VARCHAR(30),
        
          PRIMARY KEY(user_id)
        );
`,
      )
      .catch(error => {
        if (error) {
          throw new HttpException(500, ExceptionType.DB_INITIALIZE_NOT_INITIALIZED);
        }
      });
    await client.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');

    if (error instanceof HttpException) throw error;
    throw new HttpException(500, ExceptionType.DB_INITIALIZE_NOT_CONNECTED);
  }
};
