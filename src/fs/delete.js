import fs from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const deletePath = path.join(__dirname, "files", "fileToRemove.txt")

const remove = async () => {
  try {
    await fs.rm(deletePath);
  } catch {
    throw new Error("FS operation failed");
  }
};

await remove();
