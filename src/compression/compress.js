import { pipeline } from 'stream/promises';
import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

export default async function compress(srcArg, destArg, dir) {
  try {
    const src = path.isAbsolute(srcArg) ? srcArg : path.join(dir, srcArg);
    let dest = path.isAbsolute(destArg) ? destArg : path.join(dir, destArg);
    dest = path.join(dest, path.basename(src) + '.br');
  
    await pipeline(
      fs.createReadStream(src),
      zlib.createBrotliCompress(),
      fs.createWriteStream(dest, { flags: 'wx' })
    );
  } catch (error) {
    console.error(error);
  }
}