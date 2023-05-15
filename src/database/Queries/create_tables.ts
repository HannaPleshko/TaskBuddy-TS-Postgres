import { Pool } from 'pg';
import { defaultPool } from '../connection';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionType } from '@exceptions/exceptions.type';

export const createTables = async (pool: Pool = defaultPool): Promise<void> => {
  try {
    const client = await pool.connect();
    await client.query('BEGIN');
    await client
      .query(
        `
        CREATE TABLE IF NOT EXISTS users (
          user_id               UUID DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID,
          name                  VARCHAR(20) NOT NULL, 
          surname               VARCHAR(30) NOT NULL, 
          email                 VARCHAR(40) NOT NULL UNIQUE, 
          pwd                   VARCHAR(100) NOT NULL,
        
          PRIMARY KEY(user_id)
        );
        
        CREATE TABLE IF NOT EXISTS skills (
          skill_id              UUID  DEFAULT MD5(RANDOM()::TEXT || CLOCK_TIMESTAMP()::TEXT)::UUID,
          skill                 VARCHAR(20) NOT NULL, 
          description           VARCHAR(100) NOT NULL, 
          user_id               UUID  NOT NULL,

          CONSTRAINT fk_user
            FOREIGN KEY(user_id)
              REFERENCES users(user_id)
                ON DELETE CASCADE
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
