import { ApiProperty } from '@nestjs/swagger';

export type CreateUserSchema = {
  username: string;
  email: string;
  password: string;
};
export type CreateUserPayloadType = {
  password: string;
  username: string;
  email: string;
};
export class SignUpPayload {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class SignInPayload{
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export type ResponseUserSchema = {
  id:string
  username: string;
  email: string;
}

