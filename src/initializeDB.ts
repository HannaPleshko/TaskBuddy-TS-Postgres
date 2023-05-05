import { USER_DB, HOST_DB, DATABASE, PASSWORD_DB, PORT_DB } from './config/index';
import { Pool } from 'pg';

export const pool = new Pool({
  user: USER_DB,
  host: HOST_DB,
  database: DATABASE,
  password: PASSWORD_DB,
  port: PORT_DB,
});

export const createTables = async () => {
  try {
    const client = await pool.connect();
    await client.query('BEGIN');

    await client.query(
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
    );
    await client.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
  }
};
