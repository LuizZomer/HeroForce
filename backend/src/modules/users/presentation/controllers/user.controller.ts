import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Roles } from 'src/core/object-value/user-roles.enum';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { FindAllBySelectUserUseCase } from '../../domains/use-cases/user/find-all-by-select.use-case';
import { RegisterUseCase } from '../../domains/use-cases/user/register.use-case';
import { CreateUserDto } from '../dto/input/create-user.dto';
import { RegisterResponseDto } from '../dto/output/register-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly findAllUsersUseCase: FindAllBySelectUserUseCase,
  ) {}

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

  @Get('for-select')
  @HttpCode(HttpStatus.OK)
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Find all users' })
  @ApiOkResponse({
    description: 'Users found',

    schema: {
      example: {
        statusCode: 200,
        content: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Doe' },
        ],
      },
    },
  })
  async findAll() {
    const usersForSelect = await this.findAllUsersUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      content: usersForSelect,
    };
  }
}
