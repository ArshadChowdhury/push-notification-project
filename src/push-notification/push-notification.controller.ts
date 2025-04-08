import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ScheduleDto } from './dto/schedule.dto/schedule.dto';

@Controller('push-notification')
export class PushNotificationController {
    constructor(
        private readonly pushService: PushNotificationService,
        @InjectQueue('push-queue') private pushQueue: Queue,
      ) {}
    
      @Post('send-now')
      async sendNow(@Body() dto: ScheduleDto) {
        return this.pushService.sendPush(dto.title, dto.message);
      }
    
      @Post('schedule')
      async schedule(@Body() dto: ScheduleDto) {
        const delay = new Date(dto.scheduleAt).getTime() - Date.now();
        await this.pushQueue.add('send-push', {
          title: dto.title,
          message: dto.message,
        }, { delay });
        console.log('✅ Job scheduled');

        return { message: 'Scheduled' };
      }
}
