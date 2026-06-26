import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const host = await this.userRepository.findOne({
      where: { id: createRoomDto.hostId },
    });

    if (!host) {
      throw new NotFoundException('Host user not found');
    }

    const room = this.roomRepository.create({
      name: createRoomDto.name,
      description: createRoomDto.description,
      maxParticipants: createRoomDto.maxParticipants,
      host,
    });

    return this.roomRepository.save(room);
  }

  findAll() {
    return this.roomRepository.find({
      relations: {
        host: true,
      },
    });
  }

  async findOne(id: string) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: {
        host: true,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    await this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const room = await this.findOne(id);
    await this.roomRepository.remove(room);

    return {
      message: 'Room deleted successfully',
    };
  }
}
