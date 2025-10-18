import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Roles } from 'src/core/object-value/user-roles.enum';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { RegisterUseCase } from '../../domains/use-cases/user/register.use-case';
import { CreateUserDto } from '../dto/input/create-user.dto';
import { RegisterResponseDto } from '../dto/output/register-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User created',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: GlobalErrorInterface,
  })
  async create(@Body() user: CreateUserDto): Promise<RegisterResponseDto> {
    const userCreated = await this.registerUseCase.execute(user, Roles.USER);
    return {
      content: userCreated,
      status: HttpStatus.CREATED,
    };
  }
}
