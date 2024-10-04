import { User } from '../entities/user.entity';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
}
