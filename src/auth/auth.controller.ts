import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signin(@Body() credentials: any) {
    const { accessToken } = await this.authService.signin(credentials);

    return {
      data: {
        accessToken,
      },
    };
  }

  @Post('/register')
  async register(@Body() credentials: any) {
    const user = await this.authService.register(credentials);

    return user;
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}
