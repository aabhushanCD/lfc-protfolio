import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Meeting } from '../../meetings/entities/meeting.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 50 })
  maxParticipants!: number;

  @ManyToOne(() => User, (user) => user.rooms)
  host!: User;

  @OneToMany(() => Meeting, (meeting) => meeting.room)
  meetings!: Meeting[];

  @CreateDateColumn()
  createdAt!: Date;
}
