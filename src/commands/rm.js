import fs from 'fs/promises';
import path from 'path';

export default function rm(arg, dir) {
  const file = path.isAbsolute(arg) ? arg : path.join(dir, arg);
  return fs.unlink(file);
}