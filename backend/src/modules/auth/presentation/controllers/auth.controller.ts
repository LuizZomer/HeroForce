import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { ReqWithUser } from 'src/shared/types/interface/reqWithUser.interface';
import { JwtAuthUseCase } from '../../domain/use-cases/jwt-auth.use-case';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UserResponseDto } from 'src/shared/docs/user-response.docs';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtAuthUseCase: JwtAuthUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({
    description: 'Login successful',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: GlobalErrorInterface,
  })
  login(@Request() req: ReqWithUser, @Res() res: Response) {
    const token = this.jwtAuthUseCase.login(req.user);

    res.cookie('auth', token.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  validation(@Request() req: ReqWithUser) {
    return {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    };
  }
}
