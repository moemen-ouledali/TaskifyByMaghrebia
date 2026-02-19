import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { Request } from 'express';

// Extend Request to include 'user' added by Passport
interface AuthRequest extends Request {
  user: any;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login as a user' })
  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard) // LocalStrategy handles login
  @Post('/login')
  async login(@Req() req: AuthRequest) {
    // Passport attaches 'user' to req after successful authentication
    return this.authService.login(req.user);
  }
}