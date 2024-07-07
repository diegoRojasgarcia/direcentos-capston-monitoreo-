import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateProgramacionDto {
  @IsEmail()
  email: string;

  @IsString()
  actividad: string;

  @IsString()
  laboratorio: string;

  @IsString()
  labdisplayname: string;

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
