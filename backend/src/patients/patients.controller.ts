import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('patients')
@UseGuards(AuthGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Relawan', 'Admin', 'Developer'])
  create(@Body() createPatientDto: any, @Req() req) {
    return this.patientsService.create(createPatientDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.patientsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.patientsService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: any, @Req() req) {
    return this.patientsService.update(id, updatePatientDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.patientsService.remove(id, req.user);
  }

  @Post(':id/health-notes')
  addHealthNote(@Param('id') id: string, @Body() note: { datetime: Date; desc: string }, @Req() req) {
    return this.patientsService.addHealthNote(id, note, req.user);
  }

  @Delete(':id/health-notes')
  bulkDeleteNotes(@Param('id') id: string, @Body() { noteIds }: { noteIds: string[] }, @Req() req) {
    return this.patientsService.bulkDeleteNotes(id, noteIds, req.user);
  }
}