import { IsArray, IsString } from 'class-validator';

export class wDto {
  @IsArray()
  websites: string[];
}
