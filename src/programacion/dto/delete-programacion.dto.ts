import { IsInt, IsString } from 'class-validator';

export class DeleteProgramacionDto {
  @IsInt()
  id: number;
}
