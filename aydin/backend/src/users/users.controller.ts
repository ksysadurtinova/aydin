import { Controller, Get, Put, UseGuards, Request, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() body: { interests: string[] }) {
    return this.usersService.update(req.user.id, body);
  }
}