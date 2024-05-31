import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOrCreate(profile: any, platform: string): Promise<User> {
    console.log('profile :: ', profile);
    let user: User = await this.userRepository.findById(
      profile.user.email,
      platform,
    );
    if (!user) {
      user = await this.userRepository.createUser(profile.user, platform);
    }
    return user;
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.userRepository.updateRefreshToken(userId, refreshToken);
  }

  // async getRefreshToken(userId: number): Promise<string> {
  //   const user = await this.userRepository.findById(userId);
  //   return user?.refreshToken;
  // }
}
