import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { GoalType } from 'src/core/object-value/goal-type.enum';
import { PaginationOutputDocs } from 'src/shared/docs/pagination.output';

export class ProjectGoalDto {
  @ApiProperty({ type: 'number', example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ type: 'number', example: 1 })
  @Expose()
  type: GoalType;

  @ApiProperty({ type: 'number', example: 1000 })
  @Expose()
  targetValue: number;

  @ApiProperty({ type: 'number', example: 500 })
  @Expose()
  currentValue: number;

  @ApiProperty({ type: 'string', example: '2025-12-31T00:00:00.000Z' })
  @Expose()
  deadline: Date;

  @ApiProperty({ type: 'number', example: 50 })
  @Expose()
  progress: number;

  @ApiProperty({ type: 'boolean', example: false })
  @Expose()
  achieved: boolean;
}

export class UserDto {
  @ApiProperty({ type: 'number', example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ type: 'string', example: 'User name' })
  @Expose()
  name: string;
}

export class FindAllProjectsByDto {
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

  @ApiProperty({ type: 'number', example: 75 })
  @Expose()
  totalProgress: number;

  @ApiProperty({ type: UserDto, example: { id: 1, name: 'User name' } })
  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty({ type: ProjectGoalDto, isArray: true })
  @Expose()
  @Type(() => ProjectGoalDto)
  goals: ProjectGoalDto[];
}

export class FindAllByWithpaginationDto {
  @ApiProperty({ type: FindAllProjectsByDto, isArray: true })
  @Expose()
  @Type(() => FindAllProjectsByDto)
  projects: FindAllProjectsByDto[];

  @ApiProperty({ type: PaginationOutputDocs })
  @Expose()
  @Type(() => PaginationOutputDocs)
  pagination: PaginationOutputDocs;
}
