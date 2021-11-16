import { IsNotEmpty } from 'class-validator';

export class UpdateQuoteDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  desc: string;
}
