import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nickname: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 30, default: '', nullable: true })
  password: string;

  @Column({ type: 'text' })
  profileImage: string;

  @Column({ type: 'varchar', length: 10 })
  platform: string;

  @Column({ type: 'varchar', length: 255, default: '', nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;
}
