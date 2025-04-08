import { IsNotEmpty, IsString } from 'class-validator';

export class SendNowDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}