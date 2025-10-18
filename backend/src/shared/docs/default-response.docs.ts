import { ApiProperty } from '@nestjs/swagger';

export function DefaultResponseDto<T>(type: new () => T) {
  class DefaultResponse {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ type })
    content: T;
  }

  return DefaultResponse;
}
