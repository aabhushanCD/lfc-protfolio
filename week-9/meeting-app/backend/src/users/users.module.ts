import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Room } from '../rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Room])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
