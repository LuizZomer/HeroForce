import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class GlobalErrorInterface {
  @ApiProperty({ example: 400 })
  statusCode: HttpStatus;

  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
