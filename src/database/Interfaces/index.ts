export interface IUser {
  user_id?: string;
  name: string;
  surname: string;
  email: string;
  pwd: string;
}

export interface ISkill {
  skill_id?: string;
  skill: string;
  description: string;
  user_id: string;
}
