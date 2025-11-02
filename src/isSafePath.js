import path from 'path';
import os from 'os';

const ROOT = os.homedir();

export function isSafePath(target) {
  const resolved = path.resolve(target);
  return resolved.startsWith(ROOT);
}