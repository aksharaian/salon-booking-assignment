import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    const already = await this.findOne(data.email);
    if (already) {
      throw new BadRequestException('User already exists');
    }
    return this.prismaService.user.create({
      data,
    });
  }
}
