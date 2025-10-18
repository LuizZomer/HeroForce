import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { GoalType } from 'src/core/object-value/goal-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProjectGoalDto {
  @ApiProperty({ example: 'agility' })
  @IsEnum(GoalType, { message: 'Tipo de meta deve ser válido' })
  type: GoalType;

  @ApiProperty({ example: 10 })
  @IsNumber({}, { message: 'Valor alvo deve ser um número' })
  targetValue: number;

  @ApiProperty({ example: 0 })
  @IsNumber({}, { message: 'Valor atual deve ser um número' })
  currentValue: number;

  @ApiProperty({ example: '2025-10-17T17:42:21.123Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de prazo deve ser uma data' })
  deadline: Date;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean({ message: 'Alcançado deve ser um booleano' })
  achieved: boolean;
}
