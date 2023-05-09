import { Request, Response, NextFunction } from 'express';
import { SkillService } from '@services/skill.service';
import { buildResponse } from '@helper/response';

class SkillController {
  private skillService = new SkillService();

  getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      buildResponse(res, 200, await this.skillService.getSkills());
    } catch (error) {
      next(error);
    }
  };

  getSkillById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skill_id } = req.params;
      buildResponse(res, 200, await this.skillService.getSkillById(skill_id));
    } catch (error) {
      next(error);
    }
  };

  createSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skill = req.body;
      buildResponse(res, 201, await this.skillService.createSkill(skill));
    } catch (error) {
      next(error);
    }
  };

  updateSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skill_id } = req.params;
      const skill = req.body;
      buildResponse(res, 200, await this.skillService.updateSkill(skill_id, skill));
    } catch (error) {
      next(error);
    }
  };

  deleteSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skill_id } = req.params;
      buildResponse(res, 200, await this.skillService.deleteSkill(skill_id));
    } catch (error) {
      next(error);
    }
  };
}

export default SkillController;
