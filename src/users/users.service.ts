import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

    private users = Array.from({ length: 10 }).map((_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        deviceToken: uuidv4(),
      }));
    
      getAllUsers() {
        return this.users;
      }

}
