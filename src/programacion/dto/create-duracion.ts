import { IsInt, IsString } from 'class-validator';

export class CreateduracionDto {
  @IsString()
  laboratorio: string;

  @IsString()
  actividad!: string;

  @IsInt()
  horas!: number;

  @IsInt()
  minutos!: number;
}
