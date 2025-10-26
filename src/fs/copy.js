import fs from 'node:fs/promises';
import path from "path";
import {fileURLToPath} from "url";

const fileName = fileURLToPath(import.meta.url);
const directory = path.dirname(fileName);
const folderToCopy = path.join(directory, 'files');
const copyTo = path.join(directory, "files_copy");

const copy = async () => {
  try {
    await fs.access(folderToCopy);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    await fs.access(copyTo);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.cp(folderToCopy, copyTo, {recursive: true});
    } else {
      throw err;
    }
  }
};

await copy();
