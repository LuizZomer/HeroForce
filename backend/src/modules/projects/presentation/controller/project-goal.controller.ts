import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectGoalUseCase } from '../../domains/use-cases/project-goal/create-project-goal.use-case';
import { CreateProjectGoalDto } from '../dto/input/create-project-goal.dto';
import { UpdateProjectGoalUseCase } from '../../domains/use-cases/project-goal/update-project-goal.use-case';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { Roles } from 'src/core/object-value/user-roles.enum';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ProjectGoalResponseDto } from '../dto/output/create-project-goal-output.dto';
import { DeleteProjectGoalUseCase } from '../../domains/use-cases/project-goal/delete-project-goal.use-case';
import { GlobalErrorInterface } from 'src/shared/types/interface/errors/global-error.interface';

@Controller('project-goal')
export class ProjectGoalController {
  constructor(
    private readonly createProjectGoalUseCase: CreateProjectGoalUseCase,
    private readonly updateProjectGoalUseCase: UpdateProjectGoalUseCase,
    private readonly deleteProjectGoalUseCase: DeleteProjectGoalUseCase,
  ) {}

  @Post(':projectId')
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create an project goal' })
  @ApiCreatedResponse({
    description: 'Project goal created',
    type: ProjectGoalResponseDto,
  })
  async create(
    @Body() createProjectGoalDto: CreateProjectGoalDto,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    const projectGoal = await this.createProjectGoalUseCase.execute({
      ...createProjectGoalDto,
      projectId,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Meta criada com sucesso',
      content: projectGoal,
    };
  }

  @Put(':projectGoalId')
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an project goal' })
  @ApiCreatedResponse({
    description: 'Project goal updated',
    schema: {
      example: {
        statusCode: 200,
        message: 'Meta atualizada com sucesso',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Meta not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Meta não encontrada',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateProjectGoalDto: CreateProjectGoalDto,
    @Param('projectGoalId', ParseIntPipe) projectGoalId: number,
  ) {
    await this.updateProjectGoalUseCase.execute({
      ...updateProjectGoalDto,
      id: projectGoalId,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Meta atualizada com sucesso',
    };
  }

  @Delete(':projectGoalId')
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete an project goal' })
  @ApiCreatedResponse({
    description: 'Project goal deleted',
    schema: {
      example: {
        statusCode: 200,
        message: 'Meta deletada com sucesso',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Meta not found',
    type: GlobalErrorInterface,
  })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('projectGoalId', ParseIntPipe) projectGoalId: number) {
    await this.deleteProjectGoalUseCase.execute(projectGoalId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Meta deletada com sucesso',
    };
  }
}
