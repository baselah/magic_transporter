import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class ItemDto {
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  name: string = '';
  @IsNumber()
  @Min(0)
  weight!: number;
}
