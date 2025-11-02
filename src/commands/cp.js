import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

export default async function cp(sourceArg, destArg, dir) {
  const src = path.isAbsolute(sourceArg) ? sourceArg : path.join(dir, sourceArg);
  const dest = path.isAbsolute(destArg) ? destArg : path.join(dir, destArg);
  await pipeline(createReadStream(src), createWriteStream(path.join(dest, path.basename(src))));
}