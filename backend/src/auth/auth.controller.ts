import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return { message: 'Login via Auth0 frontend' };
  }

  @Post('callback')
  callback() {
    return { message: 'Callback handled by frontend' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req) {
    return req.user;
  }
}