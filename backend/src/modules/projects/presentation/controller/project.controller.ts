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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Project } from 'src/core/entities/project.entity';
import { Roles } from 'src/core/object-value/user-roles.enum';
import { RolesAllowed } from 'src/shared/decorators/roles.decorator';
import { DefaultResponseDto } from 'src/shared/docs/default-response.docs';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateProjectUseCase } from '../../domains/use-cases/project/create-project.use-case';
import { FindAllByProjectUseCase } from '../../domains/use-cases/project/find-all-by-project.use-case';
import { UpdateProjectUseCase } from '../../domains/use-cases/project/update-project.use-case';
import { CreateProjectDto } from '../dto/input/create-project.dto';
import { FindAllByProjectDto } from '../dto/input/find-all-by.use-case';
import { FindAllByWithpaginationDto } from '../dto/output/find-all-projects-by.dto';

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
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find all goals by project fields' })
  @ApiOkResponse({
    description: 'Goals found',
    type: DefaultResponseDto(FindAllByWithpaginationDto),
  })
  @HttpCode(HttpStatus.OK)
  async findAllByProject(@Query() filters: FindAllByProjectDto) {
    const { pageSize, page, ...where } = filters;
    const pagination = {
      pageSize: Number(pageSize),
      page: Number(page),
    };

    const projects = await this.findAllByProjectUseCase.execute(
      where,
      pagination,
    );

    return {
      statusCode: HttpStatus.OK,
      content: projects,
    };
  }
}
