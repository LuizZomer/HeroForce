import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../../../../shared/docs/user-response.docs';

export class RegisterResponseDto {
  @ApiProperty({ example: 201 })
  status: number;

  @ApiProperty({ type: () => UserResponseDto })
  content: UserResponseDto;
}
