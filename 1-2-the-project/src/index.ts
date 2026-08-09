import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'

const app = new Hono()

const PORT = process.env.PORT ?? 8000

app.get('/', (c) => {
  return c.html(
    `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The project</title>
    </head>

    <body>
        This is the project homepage.
    </body>

    </html>`
)
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
