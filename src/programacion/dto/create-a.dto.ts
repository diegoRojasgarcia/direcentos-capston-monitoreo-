import { IsArray, IsString } from 'class-validator';

export class aDto {
  @IsArray()
  aplicaciones: string[];
}
