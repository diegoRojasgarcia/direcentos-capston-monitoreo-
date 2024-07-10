import { IsInt, IsString } from 'class-validator';

export class DeleteAplicacionDto {
  @IsInt()
  id: number;
}
