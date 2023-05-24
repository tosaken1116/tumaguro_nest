import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { SignInPayload, SignUpPayload } from './users.type';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
@ApiTags('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @ApiProduces('application/json; charset=utf-4')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録したユーザーを返却',
    type: Response,
  })
  create(@Body() data: SignUpPayload) {
    return this.usersService.createNewUser(data);
  }

  @Post('/signin')
  @ApiProduces('application/json; charset=utf-4')
  @ApiOperation({ summary: '単体登録API' })
  @ApiResponse({
    status: 201,
    description: '登録したユーザーを返却',
    type: Response,
  })
  signIn(@Body() data: SignInPayload) {
    return this.usersService.signIn(data);
  }

  @Get()
  @ApiProduces('application/json; charset=utf-4')
  @ApiOperation({ summary: '全体取得API' })
  @ApiResponse({
    status: 200,
    description: '登録済みユーザーをすべて返却',
    type: Response,
  })
  findAll() {
    return this.usersService.users();
  }

  @Get(':id')
  @ApiProduces('application/json; charset=utf-4')
  @ApiOperation({ summary: '単体取得API' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '指定されたIDのユーザーを返却',
    type: Response,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.user(id);
  }
}
