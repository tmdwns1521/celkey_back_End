import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findOrCreate(profile: any): Promise<User> {
    let user = await this.userRepository.findOne({ where: { kakaoId: profile.kakaoId } });
    if (!user) {
      user = this.userRepository.create({ kakaoId: profile.kakaoId, email: profile.email });
      await this.userRepository.save(user);
    }
    return user;
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async getRefreshToken(userId: string): Promise<string> {
    const user = await this.userRepository.findOne(userId);
    return user?.refreshToken;
  }
}