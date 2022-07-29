import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDTO {
  @IsNotEmpty()
  desc: string;
}
