import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload, Tokens } from '../common/types';
import { Staff } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateAuthStaffDto, SignInStaffDto } from './dto';
import { Response } from 'express';
import { StaffService } from '../staff/staff.service';
import { CreateStaffDto } from '../staff/dto/create-stuff.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly staffService: StaffService
  ) {}

  async generateTokens(staff: Staff): Promise<Tokens> {
    const payload: JwtPayload = {
      id: staff.id,
      login: staff.login,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateRefreshToken(staffId: number, refresh_token: string) {
    const hashedRefreshToken = await bcrypt.hash(refresh_token, 7);
    await this.prismaService.staff.update({
      where: {
        id: staffId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async signup(createStaffDto: CreateStaffDto, res: Response) {
   
    const newStaff = await this.staffService.create(createStaffDto)
    if (!newStaff) {
      throw new InternalServerErrorException('Yangi staff yaratishda xatolik');
    }

    const tokens = await this.generateTokens(newStaff);
    await this.updateRefreshToken(newStaff.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return { id: newStaff.id, access_token: tokens.access_token };
  }

  async signin(signInStaffDto: SignInStaffDto, res: Response) {
    const staff = await this.prismaService.staff.findUnique({
      where: {
        login: signInStaffDto.login,
      },
    });

    if (!staff) {
      throw new BadRequestException('Invalid email or password');
    }
    const valid_password = await bcrypt.compare(
      signInStaffDto.password,
      staff.hashedPassword,
    );
    if (!valid_password) {
      throw new BadRequestException('Invalid email or password');
    }
    const tokens = await this.generateTokens(staff);
    await this.updateRefreshToken(staff.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });
    return {
      id: staff.id,
      access_token: tokens.access_token,
    };
  }

  async signout(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const staff = await this.prismaService.staff.findUnique({
      where: { id: payload.id },
    });
    if (!staff) {
      throw new BadRequestException('staff not found');
    }

    await this.prismaService.staff.update({
      where: { id: staff.id, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null },
    });

    res.clearCookie('refresh_token');

    return {
      message: 'staff successfully logged out',
    };
  }

  async refreshTokens(refresh_token: string, res: Response) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refresh_token,
        {
          secret: process.env.REFRESH_TOKEN_KEY,
        },
      );

      const staff = await this.prismaService.staff.findUnique({
        where: { id: payload.id },
      });
      if (!staff) {
        throw new UnauthorizedException('staff not found');
      }

      const valid_refresh_token = await bcrypt.compare(
        refresh_token,
        staff.hashedRefreshToken,
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException('Unauthorized staff');
      }

      const tokens = await this.generateTokens(staff);

      await this.updateRefreshToken(staff.id, tokens.refresh_token);

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.COOKIE_TIME,
      });

      return {
        access_token: tokens.access_token,
        id: staff.id,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Internal server error');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
