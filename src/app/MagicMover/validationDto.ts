import { IsArray, IsNumber, Min } from 'class-validator';

export class MoverDto {
  @IsNumber()
  @Min(0)
  weightLimit!: number;
}


export class MoverItemsDto {
  @IsArray()
  itemIds!: string[];
}

