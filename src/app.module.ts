import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [UsersModule, PushNotificationModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
