import fs from 'node:fs';
import path from "path";
import {fileURLToPath} from "url";
import zlib from 'zlib';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToDecompress = path.join(__dirname, "files", "archive.gz");
const outputDir = path.join(__dirname, "files", "decompressed.txt");

const decompress = async () => {
  try {
    const readableStream = fs.createReadStream(fileToDecompress);
    const writableStream = fs.createWriteStream(outputDir);
    const gzip = zlib.createGunzip();

    await pipeline(readableStream, gzip, writableStream);
  } catch (err) {
    throw new Error("FS operation failed" + err);
  }
};

await decompress();
