import fs from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const readFiles = path.join(__dirname, "files");

const list = async () => {
  try {
    const files = await fs.readdir(readFiles);
    for (const file of files) {
      console.log(file);
    }
  } catch {
    throw new Error("FS operation failed");
  }
};

await list();
