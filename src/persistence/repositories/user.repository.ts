import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { User as DomainUser } from '../../domain/entities/user.entity';
import { UserRepository as DomainUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UserRepository implements DomainUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(user: DomainUser): Promise<DomainUser> {
    const isExists = await this.userRepo.findOne({
      select: ['id', 'username'],
      where: { username: user.username },
    });
    if (isExists) throw new BadRequestException('user already exists');

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    const savedUser = await this.userRepo.save(newUser);

    return new DomainUser(
      savedUser.id,
      savedUser.username,
      savedUser.password,
      savedUser.created_on,
      savedUser.updated_on,
    );
  }

  async findByUsername(username: string): Promise<DomainUser> {
    const user = await this.userRepo.findOne({ where: { username } });

    return user
      ? new DomainUser(
          user.id,
          user.username,
          user.password,
          user.created_on,
          user.updated_on,
        )
      : null;
  }
}
