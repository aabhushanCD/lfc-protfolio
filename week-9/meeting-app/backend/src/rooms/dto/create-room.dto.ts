import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  maxParticipants?: number;

  @IsString()
  hostId!: string;
}
