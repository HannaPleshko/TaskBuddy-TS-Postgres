import { Client, Pool } from 'pg';
import { ConnectionDB } from './connection';

export abstract class Database extends ConnectionDB {
  constructor(client: Client, pool: Pool) {
    super(client, pool);
  }

  abstract getAll();
  abstract getById(id: string);
  abstract create(data: unknown);
  abstract deleteById(id: string): void;
}
