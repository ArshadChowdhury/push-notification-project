import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PushNotificationService {
    constructor(private readonly usersService: UsersService) {}

    async sendPush(title: string, message: string) {
      const users = this.usersService.getAllUsers();
      for (const user of users) {
        console.log(`📲 Sent to ${user.name}: ${title} - ${message}`);
      }
      return { message: 'Sent push notification to all users' };
    }
}
