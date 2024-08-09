import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/gaurds/jwt-auth.guard';
import { RolesGuard } from '../auth/gaurds/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body) {
    const { username, password, roles, permissions } = body;
    return this.authService.register(username, password, roles, permissions);
  }

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      return 'Invalid credentials';
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('protected')
  getProtectedResource(@Request() req) {
    return req.user;
  }
}
