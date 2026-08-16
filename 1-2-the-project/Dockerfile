FROM oven/bun:alpine

WORKDIR /app

COPY . /app

RUN bun install --frozen-lockfile
RUN bun run build

CMD ["bun", "run", "server.ts"]