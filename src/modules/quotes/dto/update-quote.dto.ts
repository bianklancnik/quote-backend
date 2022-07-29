import { IsNotEmpty } from 'class-validator';

export class UpdateQuoteDTO {
  @IsNotEmpty()
  desc: string;
}
