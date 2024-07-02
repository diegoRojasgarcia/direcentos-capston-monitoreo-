import { IsInt, IsString } from 'class-validator';

export class UpdateProgramacionDto {
  @IsInt()
  id: number;

  @IsString()
  actividad: string;

  @IsString()
  fecha: string;

  @IsString()
  horainicio: string;

  @IsString()
  horafin: string;
}
