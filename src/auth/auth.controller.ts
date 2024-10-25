import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard, RefreshTokenGuard } from '../common/guards';
import { CookieGetter, Public } from '../common/decorators';
import { CreateAuthStaffDto, SignInStaffDto } from './dto';
import { Response } from 'express';
import { CreateStaffDto } from '../staff/dto/create-stuff.dto';

@UseGuards(AccessTokenGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(
    @Body() createStaffDto: CreateStaffDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(createStaffDto, res);
  }

  @Public()
  @Post('signin')
  async signin(
    @Body() signInStaffDto: SignInStaffDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(signInStaffDto, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('signout')
  async signOut(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signout(refreshToken, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refreshtoken')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter('refresh_token') refresh_token: string,
  ) {
    return this.authService.refreshTokens(refresh_token, res);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
