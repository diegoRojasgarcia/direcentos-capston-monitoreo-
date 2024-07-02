import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateProgramacionDto {
  @IsString()
  email: string;

  @IsString()
  actividad: string;

  @IsEmail()
  laboratorio: string;

  @IsString()
  fecha: string;

  @IsString()
  horainicio: string;

  @IsString()
  horafin: string;

  @IsInt()
  a: number;

  @IsInt()
  w: number;
}
