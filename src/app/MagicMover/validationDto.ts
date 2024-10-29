import { IsNumber, Min } from 'class-validator';

export class MoverDto {
  @IsNumber()
  @Min(0)
  weightLimit!: number;
}
