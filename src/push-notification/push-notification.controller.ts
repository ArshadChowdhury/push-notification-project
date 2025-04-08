import { Controller, Post, Body, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ScheduleDto } from './dto/schedule.dto/schedule.dto';
import { SendNowDto } from './dto/send-now.dto/send-now.dto';

@Controller('push')
export class PushNotificationController {
  constructor(

    private readonly pushService: PushNotificationService,

    @InjectQueue('push-queue') private pushQueue: Queue,

  ) { }

  @Post('send-now')
  async sendNow(@Body() dto: SendNowDto) {
    try {

      await this.pushService.sendPush(dto.title, dto.message);

      return { message: 'Push notification sent to all users' };

    } catch (error) {

      console.error('Error sending push notification:', error);

      throw new InternalServerErrorException('Failed to send push notification');
    }
  }

  @Post('schedule')
  async schedule(@Body() dto: ScheduleDto) {

    try {
      const delay = new Date(dto.scheduleAt).getTime() - Date.now();

      if (delay <= 0) {
        throw new BadRequestException('Scheduled time must be in the future');
      }

      await this.pushQueue.add(
        'send-push',
        {
          title: dto.title,
          message: dto.message,
        },
        { delay },
      );

      console.log('✅ Cron Job scheduled');

      return { message: 'Scheduled push notification for all users' };

    } catch (error) {

      console.error('❌ Error scheduling push notification:', error);

      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Failed to schedule push notification');
    }
  }
}
