import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { Meeting } from '../meetings/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User, Meeting])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
