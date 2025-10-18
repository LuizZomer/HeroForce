import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindAllProjectsByUserDto {
  @ApiProperty({ type: 'number', example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ type: 'string', example: 'Project name' })
  @Expose()
  name: string;

  @ApiProperty({ type: 'string', example: 'Project description' })
  @Expose()
  description: string;

  @ApiProperty({ type: 'string', example: 'pending' })
  @Expose()
  status: string;

  @ApiProperty({ type: 'string', example: '2025-10-17T00:00:00.000Z' })
  @Expose()
  createdAt: string;
}
