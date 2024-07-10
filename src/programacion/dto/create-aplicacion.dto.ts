import { IsString } from 'class-validator';

export class CreateAplicacionDto {
  @IsString()
  nombre: string;
}
