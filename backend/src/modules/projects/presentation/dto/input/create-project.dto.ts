import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProjectStatusEnum } from 'src/core/object-value/project-status.enum';
import { CreateProjectGoalDto } from './create-project-goal.dto';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @ApiProperty({ example: 'Example Project Name' })
  @IsString({ message: 'O projeto deve conter um nome' })
  name: string;

  @ApiProperty({ example: 'Example Project Description' })
  @IsString({ message: 'O projeto deve conter uma descrição' })
  description: string;

  @ApiProperty({ example: 'pending' })
  @IsNotEmpty({ message: 'O projeto deve conter um status' })
  @IsEnum(ProjectStatusEnum, { message: 'Status inválido' })
  status: ProjectStatusEnum;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'O projeto deve conter um responsável' })
  @IsNumber({}, { message: 'Responsável inválido' })
  responsibleId: number;

  @ApiProperty({
    type: [CreateProjectGoalDto],
    description: 'list of project goals',
  })
  @IsNotEmpty({ message: 'O projeto deve conter metas' })
  @ValidateNested({ each: true })
  @Type(() => CreateProjectGoalDto)
  goals: CreateProjectGoalDto[];
}
