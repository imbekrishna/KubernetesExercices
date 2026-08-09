import { Hono } from 'hono'

const app = new Hono()

const PORT = process.env.PORT ?? 8000

app.get('/', (c) => {
  return c.text('Hello world!')
})

const server = Bun.serve({
  port: PORT,
  fetch: app.fetch
})

const shutdown = () => {
  server.stop();
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

console.log(`Server started in port ${PORT}`)
