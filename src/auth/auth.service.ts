/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private JwtService: JwtService,
  ) {}

  async signin({ username, password }: any) {
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      const isValidPassword = await user.comparePassword(password);

      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      const payload = { user };
      return {
        accessToken: await this.JwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async register(credentials: any) {
    const user = await this.userRepo.create(credentials);
    await this.userRepo.save(user);

    return user;
  }
}
