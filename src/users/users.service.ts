import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

  private users = Array.from({ length: 10 }).map((_, index) => ({

    id: uuidv4(),

    name: `User ${index + 1}`,

    deviceToken: index + 1,

  }));

  getAllUsers() {

    return this.users;

  }

}
