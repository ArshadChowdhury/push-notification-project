import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PushProcessor } from './push.processor';

@Module({
    imports: [
      BullModule.registerQueue({
        name: 'push-queue',
      }),
    ],
    providers: [PushProcessor],
    exports: [],
  })
  export class JobsModule {}
  