import { pool } from '../initializeDB';

async function getUsersDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users';
  const data = (await client.query(sql)).rows;
  return data;
}

async function getUserByIdDB(user_id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE user_id = $1';
  const data = (await client.query(sql, [user_id])).rows;
  return data;
}

async function createUserDB(name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    client.query('BEGIN');
    const sql = `INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *`;
    const data = (await client.query(sql, [name, surname, email, pwd])).rows;
    client.query('COMMIT');
    return data;
  } catch (error) {
    client.query('ROLLBACK');
  }
}

async function updateUserDB(user_id, name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    client.query('BEGIN');
    const sql = `UPDATE users SET name = $1, surname = $2, pwd = $3, email = $4 WHERE user_id = $5 RETURNING *`;
    const data = (await client.query(sql, [name, surname, email, pwd, user_id])).rows;
    client.query('COMMIT');
    return data;
  } catch (error) {
    client.query('ROLLBACK');
  }
}

async function deleteUserDB(user_id) {
  const client = await pool.connect();
  try {
    client.query('BEGIN');
    const sql = `DELETE FROM users WHERE user_id = $1 RETURNING * `;
    const data = (await client.query(sql, [user_id])).rows;
    client.query('COMMIT');
    return data;
  } catch (error) {
    client.query('ROLLBACK');
  }
}

export { getUsersDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB };
