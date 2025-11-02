import fs from 'fs/promises';
import path from 'path';

export default async function rn(source, dest, dir) {
  const from = path.isAbsolute(source) ? source : path.join(dir, source);
  const to = path.join(path.dirname(from), dest);
  await fs.rename(from, to);
}