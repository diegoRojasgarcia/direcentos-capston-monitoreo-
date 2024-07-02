import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateLaboratorioDto {
  @IsString()
  nombre: string;

  @IsString()
  displayName!: string;
}
