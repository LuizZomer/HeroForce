import { ProjectStatusEnum } from 'src/core/object-value/project-status.enum';
import { Expose } from 'class-transformer';
import { ProjectGoalResponseDto } from './create-project-goal-output.dto';

export class CreateProjectOutputDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  status: ProjectStatusEnum;

  @Expose()
  responsibleId: number;

  @Expose()
  goals: ProjectGoalResponseDto[];
}
