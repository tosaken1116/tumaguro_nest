import { ResponseUserSchema } from 'src/users/users.type';
export type JwtPayloadType = {
  userId: Pick<ResponseUserSchema, 'id'>;
};
export type JwtSchema = {
  jwt: string;
};
