import { ApiProperty } from '@nestjs/swagger';

export class FindForSelectDocs {
  @ApiProperty({ example: 'John Doe' })
  label: string;

  @ApiProperty({ example: 123 })
  value: number;
}
