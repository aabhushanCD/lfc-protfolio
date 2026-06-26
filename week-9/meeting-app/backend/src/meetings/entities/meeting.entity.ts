import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Room, (room) => room.meetings, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  room!: Room;

  @CreateDateColumn()
  startedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt?: Date;

  @Column({ default: 0 })
  participantCount!: number;
}
