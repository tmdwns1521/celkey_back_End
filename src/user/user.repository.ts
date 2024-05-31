import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: User, platform: string): Promise<User> {
    const newUser = {
      nickname: userData.nickname,
      email: userData.email,
      profileImage: userData.profileImage,
      platform: platform,
    };
    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async findById(
    email: string,
    platformName: string,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email,
        platform: platformName,
      },
    });
  }
}
