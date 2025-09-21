import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PatientsService } from './patients/patients.service';
import { RemindersService } from './reminders/reminders.service';
import { LLMService } from './llm/llm.service';
import { FonnteService } from './fonnte/fonnte.service';
import { PatientDocument } from './patients/patient.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly patientsService: PatientsService,
    private readonly remindersService: RemindersService,
    private readonly llmService: LLMService,
    private readonly fonnteService: FonnteService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('cron')
  cron() {
    return this.appService.cron();
  }

  @Post('webhook/fonnte/incoming')
  async handleIncoming(@Body() body: any) {
    const { sender, message } = body;
    const patient = await this.patientsService.findByWhatsapp(sender);
    if (!patient) return { status: 'Patient not found' };

    if (patient.verificationStatus === 'pending') {
      const { intent } = await this.llmService.classifyVerification(message);
      if (intent === 'yes') {
        patient.verificationStatus = 'verified';
        await patient.save();
        await this.fonnteService.sendMessage(sender, 'Verification successful!');
      } else if (intent === 'no') {
        patient.verificationStatus = 'failed';
        await patient.save();
        await this.fonnteService.sendMessage(sender, 'Verification failed.');
      } else {
        await this.fonnteService.sendMessage(sender, 'Please reply with yes or no.');
      }
    } else {
      const reminder = await this.remindersService.findActiveForPatient((patient as any)._id.toString());
      if (reminder) {
        const { intent } = await this.llmService.classifyConfirmation(message);
        if (intent === 'done') {
          reminder.status = 'completed';
          reminder.subStatus = 'complied';
          await reminder.save();
        } else if (intent === 'not_done') {
          reminder.status = 'completed';
          reminder.subStatus = 'not';
          await reminder.save();
        } else {
          await this.fonnteService.sendMessage(sender, 'Please reply with done or not done.');
        }
      } else {
        const { reply } = await this.llmService.respondTrivia(message);
        await this.fonnteService.sendMessage(sender, reply);
      }
    }
    return { status: 'Processed' };
  }
}
