import fs from 'fs/promises';
import cp from './cp.js';

export default async function mv(source, dest, dir) {
  await cp(source, dest, dir);
  await fs.unlink(source);
}