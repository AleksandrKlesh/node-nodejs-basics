import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export default function hash(arg, dir) {
  const file = path.isAbsolute(arg) ? arg : path.join(dir, arg);
  const hash = crypto.createHash('sha256');

  fs.createReadStream(file)
    .on('data', chunk => hash.update(chunk))
    .on('end', () => console.log(hash.digest('hex')));
}