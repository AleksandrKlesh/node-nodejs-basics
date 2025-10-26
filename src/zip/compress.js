import fs from 'node:fs';
import path from "path";
import {fileURLToPath} from "url";
import zlib from 'zlib';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToCompress = path.join(__dirname, "files", "fileToCompress.txt");
const outputDir = path.join(__dirname, "files", "archive.gz");

const compress = async () => {
  try {
    const readableStream = fs.createReadStream(fileToCompress);
    const writableStream = fs.createWriteStream(outputDir);
    const gzip = zlib.createGzip();

    await pipeline(readableStream, gzip, writableStream);
  } catch (err) {
    throw new Error("FS operation failed" + err);
  }
};

await compress();
