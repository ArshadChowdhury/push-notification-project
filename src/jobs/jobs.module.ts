import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PushProcessor } from './push.processor';
import { PushNotificationModule } from 'src/push-notification/push-notification.module';

@Module({
    imports: [
      BullModule.registerQueue({
        name: 'push-queue',
      }),
      PushNotificationModule,
    ],
    providers: [PushProcessor],
    exports: [],
  })
  export class JobsModule {}
  