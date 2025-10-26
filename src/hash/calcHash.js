import fs from 'node:fs';
import path from "path";
import {fileURLToPath} from "url";
import { createHash } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToHash = path.join(__dirname, "files", "fileToCalculateHashFor.txt")

const calculateHash = async () => {
  const readableStream = fs.createReadStream(fileToHash);

  const hash = createHash("sha256");

  readableStream.on('data', (data) => {
    hash.update(data);
  })

  readableStream.on('end', () => {
    console.log(hash.digest("hex"));
  })
};

await calculateHash();
