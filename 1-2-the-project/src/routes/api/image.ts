import { createFileRoute } from '@tanstack/react-router'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const Route = createFileRoute('/api/image')({
    server: {
        handlers: {
            GET: async () => {
                const imagePath = path.join(
                    process.cwd(),
                    'data',
                    'static.jpg'
                )

                try {
                    const image = await readFile(imagePath)

                    return new Response(image, {
                        headers: {
                            'Content-Type': 'image/jpeg',
                            'Cache-Control': 'no-cache',
                        },
                    })
                } catch {
                    return new Response('Image not found', {
                        status: 404,
                    })
                }
            },
        },
    },
})