import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  RefreshToken,
  ResetPasswordToken,
  User,
  VerificationToken,
} from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne<T extends Prisma.UserSelect>(
    where: Prisma.UserWhereUniqueInput,
    select?: T,
  ): Promise<Prisma.UserGetPayload<{ select: T }> | null> {
    return this.prismaService.user.findUnique({
      where,
      select: select ?? ({ id: true } as T),
    });
  }
  async create(data: Prisma.UserCreateInput): Promise<Pick<User, 'id'>> {
    return this.prismaService.user.create({ data, select: { id: true } });
  }
  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<Pick<User, 'id'>> {
    return this.prismaService.user.update({
      where,
      data,
      select: { id: true },
    });
  }
  async delete(where: Prisma.UserWhereUniqueInput): Promise<Pick<User, 'id'>> {
    return this.prismaService.user.delete({
      where,
      select: { id: true },
    });
  }
  async upsertRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<Pick<RefreshToken, 'userId'>> {
    return this.prismaService.refreshToken.upsert({
      where: { userId },
      create: { token, expiresAt, userId },
      update: { token, expiresAt },
      select: { userId: true },
    });
  }
  async upsertVerificationToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<Pick<VerificationToken, 'userId'>> {
    return this.prismaService.verificationToken.upsert({
      where: { userId },
      create: { token, expiresAt, userId },
      update: { token, expiresAt },
      select: { userId: true },
    });
  }
  async upsertResetPasswordToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<Pick<ResetPasswordToken, 'userId'>> {
    return this.prismaService.resetPasswordToken.upsert({
      where: { userId },
      create: { token, expiresAt, userId },
      update: { token, expiresAt },
      select: { userId: true },
    });
  }
}
