FROM node:18-alpine3.16

RUN mkdir -p /opt
COPY . /opt/
WORKDIR /opt

RUN npm i -g pnpm
RUN pnpm i
RUN pnpm dlx prisma generate
RUN pnpm build

CMD pnpm start:dev