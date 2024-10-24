import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload, Tokens } from '../common/types';
import { Stuff } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateStuffDto, SignInStuffDto } from './dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateTokens(stuff: Stuff): Promise<Tokens> {
    const payload: JwtPayload = {
      id: stuff.id,
      login: stuff.login,
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

  async updateRefreshToken(stuffId: number, refresh_token: string) {
    const hashedRefreshToken = await bcrypt.hash(refresh_token, 7);
    await this.prismaService.stuff.update({
      where: {
        id: stuffId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async signup(createStuffDto: CreateStuffDto, res: Response) {
    const candidate = await this.prismaService.stuff.findUnique({
      where: {
        login: createStuffDto.login,
      },
    });

    if (candidate) {
      throw new BadRequestException('Email already exists');
    }

    if (createStuffDto.password !== createStuffDto.confirm_password) {
      throw new BadRequestException('Password does not match');
    }
    const hashedPassword = await bcrypt.hash(createStuffDto.password, 10);

    const newStuff = await this.prismaService.stuff.create({
      data: {
        first_name: createStuffDto.first_name,
        last_name: createStuffDto.last_name,
        login: createStuffDto.login,
        phone_number: createStuffDto.phone_number,
        hashedPassword,
      },
    });

    const tokens = await this.generateTokens(newStuff);
    await this.updateRefreshToken(newStuff.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return { id: newStuff.id, access_token: tokens.access_token };
  }

  async signin(signInStuffDto: SignInStuffDto, res: Response) {
    const stuff = await this.prismaService.stuff.findUnique({
      where: {
        login: signInStuffDto.login,
      },
    });

    if (!stuff) {
      throw new BadRequestException('Invalid email or password');
    }
    const valid_password = await bcrypt.compare(
      signInStuffDto.password,
      stuff.hashedPassword,
    );
    if (!valid_password) {
      throw new BadRequestException('Invalid email or password');
    }
    const tokens = await this.generateTokens(stuff);
    await this.updateRefreshToken(stuff.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });
    return {
      id: stuff.id,
      access_token: tokens.access_token,
    };
  }

  async signout(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const stuff = await this.prismaService.stuff.findUnique({
      where: { id: payload.id },
    });
    if (!stuff) {
      throw new BadRequestException('stuff not found');
    }

    await this.prismaService.stuff.update({
      where: { id: stuff.id, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null },
    });

    res.clearCookie('refresh_token');

    return {
      message: 'stuff successfully logged out',
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

      const stuff = await this.prismaService.stuff.findUnique({
        where: { id: payload.id },
      });
      if (!stuff) {
        throw new UnauthorizedException('stuff not found');
      }

      const valid_refresh_token = await bcrypt.compare(
        refresh_token,
        stuff.hashedRefreshToken,
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException('Unauthorized stuff');
      }

      const tokens = await this.generateTokens(stuff);

      await this.updateRefreshToken(stuff.id, tokens.refresh_token);

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.COOKIE_TIME,
      });

      return {
        access_token: tokens.access_token,
        id: stuff.id,
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
