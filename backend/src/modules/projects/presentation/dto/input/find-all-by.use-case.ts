import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { ProjectStatusEnum } from 'src/core/object-value/project-status.enum';

export class FindAllByProjectDto {
  @ApiProperty({
    description: 'Id do responsável',
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: 'O id do responsável deve ser um número' })
  responsibleId: number;

  @ApiProperty({
    description: 'Status do projeto',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectStatusEnum, { message: 'O status deve ser um enum' })
  status: ProjectStatusEnum;

  @ApiProperty({
    description: 'Tamanho da página',
    required: false,
  })
  @IsNumberString({}, { message: 'O tamanho da página deve ser um número' })
  pageSize: number;

  @ApiProperty({
    description: 'Número da página',
    required: false,
  })
  @IsNumberString({}, { message: 'O número da página deve ser um número' })
  page: number;
}
