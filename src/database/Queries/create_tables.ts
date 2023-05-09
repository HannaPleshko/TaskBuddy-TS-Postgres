import { Pool } from 'pg';
import { defaultPool } from '../connection';

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
    await client.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
  }
};
