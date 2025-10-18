import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from '../dto/input/create-project.dto';
import { CreateProjectUseCase } from '../../domains/use-cases/project/create.use-case';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { Roles } from 'src/core/object-value/user-roles.enum';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Project } from 'src/core/entities/project.entity';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UpdateProjectUseCase } from '../../domains/use-cases/project/update.use-case';
import { FindAllByProjectUseCase } from '../../domains/use-cases/project/find-all-by.use-case';
import { FindAllByProjectDto } from '../dto/input/find-all-by.use-case';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly findAllByProjectUseCase: FindAllByProjectUseCase,
  ) {}

  @Post()
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create an project' })
  @ApiCreatedResponse({
    description: 'Project created',
    type: Project,
  })
  @ApiBadRequestResponse({
    description: 'Responsável não encontrado',
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.createProjectUseCase.execute(createProjectDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Projeto criado com sucesso',
      content: project,
    };
  }

  @Put(':projectId')
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update an project' })
  @ApiCreatedResponse({
    description: 'Project updated',
    type: Project,
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateProjectDto: Omit<CreateProjectDto, 'goals'>,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    await this.updateProjectUseCase.execute({
      ...updateProjectDto,
      id: projectId,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Projeto atualizado com sucesso',
    };
  }

  @Get()
  @RolesAllowed(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Find all goals by project fields' })
  @ApiCreatedResponse({
    description: 'Goals found',
    // type: ProjectGoal,
  })
  @HttpCode(HttpStatus.OK)
  async findAllByProject(@Query() findAllByProjectDto: FindAllByProjectDto) {
    const goals = await this.findAllByProjectUseCase.execute({
      ...findAllByProjectDto,
    });

    return {
      statusCode: HttpStatus.OK,
      content: goals,
    };
  }
}
