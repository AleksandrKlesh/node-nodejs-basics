import { createReadStream } from 'fs';
import path from 'path';

export default async function cat(arg, dir) {
  const file = path.isAbsolute(arg) ? arg : path.join(dir, arg);
  const rs = createReadStream(file);
  rs.pipe(process.stdout);
  rs.on('end', () => {
    process.stdout.write('\n> ');
  });
}