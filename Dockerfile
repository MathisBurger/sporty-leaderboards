FROM node:14-alpine as webBuild


WORKDIR /webapp

# install frontend
COPY ./frontend-web .
RUN npm i
RUN npm run build

FROM rust:latest as backendBuild

WORKDIR /usr/src/backend

RUN rustup target add x86_64-unknown-linux-musl
RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential git clang llvm-dev libclang-dev libssl-dev pkg-config libpq-dev musl-tools brotli

# build rust backend
COPY ./backend .
RUN cargo install --target x86_64-unknown-linux-musl --path .




FROM alpine:3 as final
WORKDIR /app
COPY --from=webBuild /webapp/build ./build
COPY --from=backendBuild /usr/local/cargo/bin/backend .
COPY ./backend/sqlx-data.json .


EXPOSE 8080
ENV DATABASE_URL=mysql://root@localhost:3306/sporty-leaderboards
CMD ["./backend"]











