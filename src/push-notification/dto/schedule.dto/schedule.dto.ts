import { IsNotEmpty, IsISO8601, IsString } from 'class-validator';

export class ScheduleDto {
  @IsNotEmpty()
  @IsString()
  title: string;


  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  scheduleAt: string;
}