import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtSchema } from 'src/auth/auth.type';
import { PrismaService } from 'src/prismma.service';
import { checkPasswordCorrect, genPasswordHash } from 'src/utils/password';
import { ResponseUserSchema, SignInPayload, SignUpPayload } from './users.type';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async user(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async signIn(data: SignInPayload): Promise<JwtSchema> {
    const userExist = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!userExist) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    if (!checkPasswordCorrect(data.password, userExist.password_hash)) {
      throw new HttpException('password is incorrect', HttpStatus.FORBIDDEN);
    }

    return this.authService.createJWT({ id: userExist.id });
  }

  async createNewUser(data: SignUpPayload): Promise<ResponseUserSchema> {
    const userExist = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    if (userExist) {
      throw new HttpException('email is already use', HttpStatus.CONFLICT);
    }
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password_hash: await genPasswordHash(data.password),
      },
      select: {
        id: true,
        username: true,
        password_hash: false,
        email: true,
      },
    });
  }
}
