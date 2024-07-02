import { IsInt, IsString } from 'class-validator';

export class UpdateLaboratorioDto {
  @IsInt()
  id: number;

  @IsString()
  displayName: string;
}
