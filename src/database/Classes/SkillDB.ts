import { Database } from '..';
import { ISkill } from '../Interfaces';
import { HttpException } from '@exceptions/HttpException';
import { ExceptionType } from '@exceptions/exceptions.type';
import { logger } from '@utils/logger';
import { DatabaseError } from 'pg';

export class SkillDB extends Database {
  async create(data: ISkill): Promise<ISkill[]> {
    try {
      await this.pool.query('BEGIN');

      const { skill, description, user_id } = data;

      const query = {
        text: 'INSERT INTO skills (skill, description, user_id) VALUES ($1, $2, $3) RETURNING *',
        values: [skill, description, user_id],
      };

      const createdSkill: ISkill[] = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return createdSkill;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SKILLS_CREATE_NOT_CREATED);
    }
  }

  async getAll(): Promise<ISkill[]> {
    try {
      const query = { text: 'SELECT * FROM skills' };

      const gotSkills: ISkill[] = (await this.pool.query(query)).rows;
      if (!gotSkills.length) throw new HttpException(404, ExceptionType.DB_SKILLS_NOT_FOUND);

      return gotSkills;
    } catch (err) {
      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SKILLS_GET_ALL_NOT_GOT);
    }
  }

  async getById(skill_id: string): Promise<ISkill[]> {
    try {
      const query = {
        text: 'SELECT * FROM skills WHERE skill_id = $1',
        values: [skill_id],
      };

      const gotSkill: ISkill[] = (await this.pool.query(query)).rows;
      if (!gotSkill.length) throw new HttpException(404, ExceptionType.DB_SKILLS_NOT_FOUND);

      return gotSkill;
    } catch (err) {
      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SKILLS_GET_BY_ID_NOT_GOT);
    }
  }

  async deleteById(skill_id: string): Promise<ISkill[]> {
    try {
      await this.pool.query('BEGIN');
      const query = {
        text: 'DELETE FROM skills WHERE skill_id = $1 RETURNING *',
        values: [skill_id],
      };

      const deletedSkill: ISkill[] = (await this.pool.query(query)).rows;
      await this.pool.query('COMMIT');

      return deletedSkill;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SKILLS_DELETE_NOT_DELETED);
    }
  }

  async updateById(skill_id: string, data: ISkill): Promise<ISkill[]> {
    try {
      await this.pool.query('BEGIN');

      const queryForGet = {
        text: 'SELECT * FROM skills WHERE skill_id = $1',
        values: [skill_id],
      };

      const foundSkill: ISkill[] = (await this.pool.query(queryForGet)).rows;
      if (!foundSkill.length) throw new HttpException(404, ExceptionType.DB_USERS_NOT_FOUND);

      const { skill, description, user_id } = data;

      const query = {
        text: `UPDATE skills SET skill = $1, description = $2, user_id = $3 WHERE skill_id = $4 RETURNING *`,
        values: [skill, description, user_id, skill_id],
      };

      const updatedSkills: ISkill[] = (await this.pool.query(query)).rows;

      await this.pool.query('COMMIT');

      return updatedSkills;
    } catch (err) {
      await this.pool.query('ROLLBACK');

      const error: DatabaseError = err;
      logger.error(`Message: ${error.message}. Detail: ${error.detail}`);

      throw new HttpException(500, ExceptionType.DB_SKILLS_UPDATE_NOT_UPDETED);
    }
  }
}
