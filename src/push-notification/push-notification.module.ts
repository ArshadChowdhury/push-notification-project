import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PushNotificationController } from './push-notification.controller';
import { PushNotificationService } from './push-notification.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule,
    BullModule.registerQueue({
      name: 'push-queue', 
    }),],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
