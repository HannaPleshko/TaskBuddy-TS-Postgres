import { defaultClient as client, defaultPool as pool } from '../database/connection';
import { UserDB } from '../database/Classes/UserDB';
import { IUser } from '../database/Interfaces';

export class UserService {
  private userDB = new UserDB(client, pool);

  async getUsers(): Promise<IUser[]> {
    const data = await this.userDB.getAll();
    return data;
  }

  async getUserById(user_id: string): Promise<IUser> {
    const user = await this.userDB.getById(user_id);
    return user;
  }

  async createUser(user: IUser): Promise<IUser> {
    const data = await this.userDB.create(user);
    return data;
  }

  async updateUser(user_id: string, user: IUser): Promise<IUser> {
    const data = await this.userDB.updateById(user_id, user);
    return data;
  }

  async deleteUser(user_id: string): Promise<IUser> {
    const data = await this.userDB.deleteById(user_id);
    return data;
  }
}
