import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '12345678901' })
  @IsString()
  document: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password: string;
}
