import fs from 'node:fs';
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToWrite = path.join(__dirname, "files", "fileToWrite.txt")

const write = async () => {
  try {
    const writableStream = fs.createWriteStream(fileToWrite, 'utf-8');

    process.stdin.pipe(writableStream);

    writableStream.on('end', () => {
      process.stdout.write("\nFinished!\n");
    })

    writableStream.on('error', (err) => {
      throw new Error('FS operation failed', err);
    })
  } catch {
      throw new Error('FS operation failed');
  }
};

await write();
