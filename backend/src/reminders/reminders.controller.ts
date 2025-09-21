import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';

@Controller('reminders')
@UseGuards(AuthGuard)
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['Relawan', 'Admin', 'Developer'])
  create(@Body() createReminderDto: any, @Req() req) {
    return this.remindersService.create(createReminderDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.remindersService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.remindersService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReminderDto: any, @Req() req) {
    return this.remindersService.update(id, updateReminderDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.remindersService.remove(id, req.user);
  }
}