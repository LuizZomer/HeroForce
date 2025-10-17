import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Roles } from 'src/core/object-value/user-roles.enum';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { RegisterUseCase } from '../../domains/use-cases/user/register.use-case';
import { CreateUserDto } from '../dto/input/create-user.dto';
import { RegisterResponseDto } from '../dto/output/register-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post()
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new operator' })
  @ApiCreatedResponse({
    description: 'Operator created',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User already exists',
    type: GlobalErrorInterface,
  })
  async createOperator(
    @Body() user: CreateUserDto,
  ): Promise<RegisterResponseDto> {
    const userCreated = await this.registerUseCase.execute(user, Roles.USER);
    return {
      content: userCreated,
      status: HttpStatus.CREATED,
    };
  }
}
