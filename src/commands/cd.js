import fs from 'fs/promises';
import path from 'path';
import { isSafePath } from '../isSafePath.js';
import { invalid, opFailed } from '../printMessages.js';

export default async function cd(arg, currentDir) {
  if (!arg) return invalid();
  const target = path.isAbsolute(arg) ? arg : path.join(currentDir, arg);

  try {
    const stat = await fs.stat(target);
    if (!stat.isDirectory() || !isSafePath(target)) return currentDir;
    return path.resolve(target);
  } catch {
    opFailed();
    return currentDir;
  }
}