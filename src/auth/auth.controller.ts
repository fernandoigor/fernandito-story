import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }) {
    return {
      token: await this.authService.login(email, password),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Request() req): any {
    console.log(req.user);
    return req.user;
  }
}
