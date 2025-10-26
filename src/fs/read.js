import fs from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRead = path.join(__dirname, "files", "fileToRead.txt")

const read = async () => {
  try {
    const content = await fs.readFile(fileToRead, "utf-8");
    console.log(content);
  } catch {
    throw new Error("FS operation failed");
  }
};

await read();
