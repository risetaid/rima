import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './patient.schema';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: any, user: UserDocument) {
    return this.patientModel.create({
      ...createPatientDto,
      relawanId: user._id,
    });
  }

  async findAll(user: UserDocument) {
    if (user.role === 'Relawan') {
      return this.patientModel.find({ relawanId: user._id });
    }
    return this.patientModel.find();
  }

  async findOne(id: string, user: UserDocument) {
    const query: any = { _id: id };
    if (user.role === 'Relawan') {
      query.relawanId = user._id;
    }
    const patient = await this.patientModel.findOne(query);
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, updatePatientDto: any, user: UserDocument) {
    const query: any = { _id: id };
    if (user.role === 'Relawan') {
      query.relawanId = user._id;
    }
    return this.patientModel.findOneAndUpdate(query, updatePatientDto, { new: true });
  }

  async remove(id: string, user: UserDocument) {
    const query: any = { _id: id };
    if (user.role === 'Relawan') {
      query.relawanId = user._id;
    }
    return this.patientModel.findOneAndDelete(query);
  }

  async addHealthNote(id: string, note: { datetime: Date; desc: string }, user: UserDocument) {
    const patient = await this.findOne(id, user);
    patient.healthNotes.push(note);
    return patient.save();
  }

  async bulkDeleteNotes(id: string, noteIds: string[], user: UserDocument) {
    const patient = await this.findOne(id, user);
    patient.healthNotes = patient.healthNotes.filter(note => note._id && !noteIds.includes(note._id.toString()));
    return patient.save();
  }

  async findByWhatsapp(whatsapp: string) {
    return this.patientModel.findOne({ whatsapp });
  }
}