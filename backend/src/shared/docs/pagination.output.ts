import { ApiProperty } from '@nestjs/swagger';

export class PaginationOutputDocs {
  @ApiProperty({ type: 'number', example: 1 })
  page: number;

  @ApiProperty({ type: 'number', example: 10 })
  perPage: number;

  @ApiProperty({ type: 'number', example: 1 })
  totalPages: number;

  @ApiProperty({ type: 'number', example: 1 })
  nextPage: number | null;

  @ApiProperty({ type: 'number', example: 1 })
  previousPage: number | null;

  @ApiProperty({ type: 'number', example: 1 })
  totalItems: number;
}
