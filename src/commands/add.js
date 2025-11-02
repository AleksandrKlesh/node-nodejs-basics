import fs from 'fs/promises';
import path from 'path';

export default async function add(name, dir) {
  await fs.writeFile(path.join(dir, name), '', { flag: 'wx' });
}