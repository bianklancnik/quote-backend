import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  desc: string;
}
