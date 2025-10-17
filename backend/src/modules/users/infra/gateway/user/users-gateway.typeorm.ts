import { Injectable } from '@nestjs/common';
import { UsersGatewayInterface } from './users-gateway.interface';
import { User } from 'src/core/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersGatewayTypeorm implements UsersGatewayInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneBy(where: Partial<User>): Promise<User | null> {
    return this.userRepository.findOne({ where });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }
}
