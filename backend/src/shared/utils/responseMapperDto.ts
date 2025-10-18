import { ClassConstructor, plainToInstance } from 'class-transformer';

export function responseMapperDto<T, V>(
  dtoClass: ClassConstructor<T>,
  data: V | V[],
): T | T[] {
  return plainToInstance(dtoClass, data, {
    excludeExtraneousValues: true,
  });
}
