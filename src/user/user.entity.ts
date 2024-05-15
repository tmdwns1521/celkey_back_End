import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  kakaoId: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 0 })
  level: number;

  @Column({ unique: true, default: '' })
  refreshToken: string;
}
