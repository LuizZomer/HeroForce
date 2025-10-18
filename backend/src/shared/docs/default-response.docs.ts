import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export function DefaultResponseDto<T>(type: new () => T, name?: string) {
  @ApiExtraModels(type) // registra o tipo genérico para Swagger
  class DefaultResponse {
    @ApiProperty({ example: 200 })
    statusCode: number;

    @ApiProperty({ type })
    content: T;
  }

  Object.defineProperty(DefaultResponse, 'name', {
    value: name || `DefaultResponse_${type.name}`,
  });

  return DefaultResponse;
}
