import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/gaurds/jwt-auth.guard';
import { RolesGuard } from '../auth/gaurds/roles.guard';
import { Roles } from '../auth/roles.decorator';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/create-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully created.' })
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password, roles, permissions } = createUserDto;
    return this.authService.register(username, password, roles, permissions);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Login Successfully!.' })
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
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
