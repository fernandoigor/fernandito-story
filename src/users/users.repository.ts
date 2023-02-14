import { UserDto } from './user.dto';

export abstract class UserRepository {
  abstract create(data): Promise<void>;
  abstract update(userId: string, data): Promise<void>;
  abstract findByEmail(email: string): Promise<UserDto>;
}
