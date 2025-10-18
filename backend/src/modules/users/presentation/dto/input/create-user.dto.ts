import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsString({ message: 'Email deve ser uma string' })
  email: string;

  @ApiProperty({ example: 'Example@123' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Senha deve ter pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 símbolo',
    },
  )
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Nome do personagem deve ser uma string' })
  characterName: string;
}
