import fs from 'fs/promises';
import path from 'path';

export default function mkdir(name, dir) {
  return fs.mkdir(path.join(dir, name));
}