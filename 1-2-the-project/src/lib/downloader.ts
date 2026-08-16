import path from 'path';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { createServerFn } from '@tanstack/react-start';

const IMAGE_URL = 'https://picsum.photos/300';

const IMAGE_DIR = path.join(process.cwd(), 'data');
const IMAGE_PATH = path.join(IMAGE_DIR, 'static.jpg');

const CACHE_TIME = 10 * 60 * 1000;

function isImageExpired(filePath: string) {
    if (!existsSync(filePath)) {
        return true;
    }

    const { mtimeMs } = statSync(filePath);
    return Date.now() - mtimeMs > CACHE_TIME;
}

export const downloadImage = createServerFn().handler(async () => {
    mkdirSync(IMAGE_DIR, { recursive: true });

    if (!isImageExpired(IMAGE_PATH)) {
        return;
    }

    const response = await fetch(IMAGE_URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
    }

    console.log('Image downloaded')

    const buffer = await response.arrayBuffer();

    writeFileSync(IMAGE_PATH, new Uint8Array(buffer));
});