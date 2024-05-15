import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOrCreate(profile: any): Promise<User> {
    console.log('profile :: ', profile);
    let user = await this.userRepository.findOne({
      where: { kakaoId: profile.user.kakaoId },
    });
    if (!user) {
      user = this.userRepository.create({
        kakaoId: profile.user.kakaoId,
        email: profile.user.email,
      });
      await this.userRepository.save(user);
    }
    return user;
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async getRefreshToken(userId: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const user = await this.userRepository.findOne(userId);
    return user?.refreshToken;
  }
}
