import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import SkillController from '@controllers/skill.controller';

class SkillRoute implements Routes {
  public path = '/skill';

  public router = Router();
  public skillController = new SkillController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.skillController.getSkills);
    this.router.get(`${this.path}/:skill_id`, this.skillController.getSkillById);
    this.router.post(`${this.path}`, this.skillController.createSkill);
    this.router.patch(`${this.path}/:skill_id`, this.skillController.updateSkill);
    this.router.delete(`${this.path}/:skill_id`, this.skillController.deleteSkill);
  }
}

export default SkillRoute;
