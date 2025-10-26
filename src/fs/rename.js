import fs from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const renameFrom = path.join(__dirname, "files", "wrongFilename.txt");
const renameTo = path.join(__dirname, "files", "properFilename.md");

const rename = async () => {
  try {
    await fs.access(renameFrom);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    await fs.access(renameTo);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.rename(renameFrom, renameTo);
    } else {
      throw err;
    }
  }
};

await rename();
