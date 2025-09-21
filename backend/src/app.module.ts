import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { RemindersModule } from './reminders/reminders.module';
import { ContentModule } from './content/content.module';
import { LLMModule } from './llm/llm.module';
import { FonnteModule } from './fonte/fonte.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/rima'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    PatientsModule,
    RemindersModule,
    ContentModule,
    LLMModule,
    FonnteModule,
    WebSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
