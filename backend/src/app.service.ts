import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    // Hardcode first developer
    const existing = await this.userModel.findOne({ email: 'davidyusaku13@gmail.com' });
    if (!existing) {
      await this.userModel.create({
        email: 'davidyusaku13@gmail.com',
        role: 'Developer',
        verified: true,
      });
      console.log('First developer created: davidyusaku13@gmail.com');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
