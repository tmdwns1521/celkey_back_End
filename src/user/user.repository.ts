import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findByKakaoId(kakaoId: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { kakaoId } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.repository.update(userId, { refreshToken });
  }

  async findById(userId: number): Promise<User | undefined> {
    return this.repository.findOne({ where: { id: userId } });
  }
}
