import { pipeline } from 'stream/promises';
import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

export default async function decompress(srcArg, destArg, dir) {
  try {
    const src = path.isAbsolute(srcArg) ? srcArg : path.join(dir, srcArg);
    let dest = path.isAbsolute(destArg) ? destArg : path.join(dir, destArg);
    dest = path.join(dest, path.basename(src).slice(0, -3));
  
    await pipeline(
      fs.createReadStream(src),
      zlib.createBrotliDecompress(),
      fs.createWriteStream(dest)
    );
  } catch (error) {
    console.error(error);
  }
}