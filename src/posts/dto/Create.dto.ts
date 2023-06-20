import { IsString, MaxLength } from 'class-validator';

export class CreateDto {
  @IsString()
  @MaxLength(20)
  title: string;

  @IsString()
  @MaxLength(140)
  content: string;
}
