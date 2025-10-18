import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FindAllByUserDto {
  @ApiProperty({
    description: 'Tamanho da página',
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: 'O tamanho da página deve ser um número' })
  pageSize: number;

  @ApiProperty({
    description: 'Número da página',
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: 'O número da página deve ser um número' })
  page: number;
}
