import { defaultClient as client, defaultPool as pool } from '@database/connection';
import { SkillDB } from '@database/Classes/SkillDB';
import { ISkill } from '@database/Interfaces';

export class SkillService {
  private skillDB = new SkillDB(client, pool);

  async getSkills(): Promise<ISkill[]> {
    const skills = await this.skillDB.getAll();
    return skills;
  }

  async getSkillById(skill_id: string): Promise<ISkill[]> {
    const skill = await this.skillDB.getById(skill_id);
    return skill;
  }

  async createSkill(skill: ISkill): Promise<ISkill[]> {
    const createdSkill = await this.skillDB.create(skill);
    return createdSkill;
  }

  async updateSkill(skill_id: string, skill: ISkill): Promise<ISkill[]> {
    const updatedSkill = await this.skillDB.updateById(skill_id, skill);
    return updatedSkill;
  }

  async deleteSkill(skill_id: string): Promise<ISkill[]> {
    const deletedSkill = await this.skillDB.deleteById(skill_id);
    return deletedSkill;
  }
}
