import { mkdir, rm, copyFile, cp, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
await stat(path.join(root, 'public/assets/hero-menu.webp'));
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await copyFile(path.join(root, 'index.html'), path.join(out, 'index.html'));
await cp(path.join(root, 'src'), path.join(out, 'src'), { recursive: true });
await cp(path.join(root, 'public'), out, { recursive: true });
console.log('Build complete: dist/');
