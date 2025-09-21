import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reminder, ReminderDocument } from './reminder.schema';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class RemindersService {
  constructor(
    @InjectModel(Reminder.name) private reminderModel: Model<ReminderDocument>,
  ) {}

  async create(createReminderDto: any, user: UserDocument) {
    return this.reminderModel.create({
      ...createReminderDto,
      createdBy: user._id,
    });
  }

  async findAll(user: UserDocument) {
    // For Relawan, filter by patients they manage
    if (user.role === 'Relawan') {
      return this.reminderModel.find({ createdBy: user._id }).populate('patientId');
    }
    return this.reminderModel.find().populate('patientId');
  }

  async findOne(id: string, user: UserDocument) {
    const query: any = { _id: id };
    if (user.role === 'Relawan') {
      query.createdBy = user._id;
    }
    const reminder = await this.reminderModel.findOne(query).populate('patientId');
    if (!reminder) throw new NotFoundException('Reminder not found');
    return reminder;
  }

  async update(id: string, updateReminderDto: any, user: UserDocument) {
    const query: any = { _id: id };
    if (user.role === 'Relawan') {
      query.createdBy = user._id;
    }
    return this.reminderModel.findOneAndUpdate(query, updateReminderDto, { new: true });
  }

  async remove(id: string, user: UserDocument) {
    const query: any = { _id: id };
    if (user.role === 'Relawan') {
      query.createdBy = user._id;
    }
    return this.reminderModel.findOneAndDelete(query);
  }

  // Placeholder for cron
  async checkDueReminders() {
    const now = new Date();
    const dueReminders = await this.reminderModel.find({
      status: 'scheduled',
      datetime: { $lte: now },
    });
    // Logic to send via Fonnte, update status
    // For now, just update to sent
    for (const reminder of dueReminders) {
      reminder.status = 'sent';
      await reminder.save();
    }
    return dueReminders;
  }
}