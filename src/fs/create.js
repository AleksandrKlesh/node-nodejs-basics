import fs from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";

const fileName = fileURLToPath(import.meta.url);
const directory = path.dirname(fileName);
const filePath = path.join(directory, 'files', 'fresh.txt');

const create = async () => {
  try {
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
    await fs.writeFile(filePath, "I am fresh and young");
  }
};

await create();
