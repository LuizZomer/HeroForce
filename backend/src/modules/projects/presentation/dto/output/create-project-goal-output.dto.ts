import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GoalType } from 'src/core/object-value/goal-type.enum';

export class ProjectGoalResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: GoalType })
  @Expose()
  type: GoalType;

  @ApiProperty({ example: 100 })
  @Expose()
  targetValue: number;

  @ApiProperty({ example: 50 })
  @Expose()
  currentValue: number;

  @ApiProperty({ example: '2025-10-17T22:26:32.000Z' })
  @Expose()
  deadline?: Date;

  @ApiProperty({ example: false })
  @Expose()
  achieved: boolean;
}
