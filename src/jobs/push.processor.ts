import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { PushNotificationService } from 'src/push-notification/push-notification.service';

@Processor('push-queue')
@Injectable()
export class PushProcessor {
  constructor(private readonly pushNotificationService: PushNotificationService) {}

  @Process('send-push')
  async handlePushJob(job: Job) {
    const { title, message } = job.data;
    console.log(`📩 Executing scheduled job: ${title}`);
    await this.pushNotificationService.sendPush(title, message);
  }
}
