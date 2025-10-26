import fs from 'node:fs';
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRead = path.join(__dirname, "files", "fileToRead.txt")

const read = async () => {
  try {
    const readableStream = fs.createReadStream(fileToRead, 'utf-8');

    readableStream.pipe(process.stdout);

    readableStream.on('end', () => {
      process.stdout.write("\nFinished!\n");
    })

    readableStream.on('error', (err) => {
      throw new Error('FS operation failed', err);
    })
  } catch {
      throw new Error('FS operation failed');
  }
};

await read();
