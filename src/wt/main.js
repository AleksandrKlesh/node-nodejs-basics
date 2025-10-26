import path from "path";
import {fileURLToPath} from "url";
import { Worker } from "node:worker_threads";
import os from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, "worker.js")
const baseNum = 11;

const workerPromise = (workerFile, num) => {
  return new Promise((resolve) => {
    const worker = new Worker(workerFile, {workerData: num});

    worker.on("message", (data) => {
      resolve({ status: "resolved", data });
    });

    worker.on("error", () => {
      resolve({ status: "error", data: null });
    });
  })
} 

const performCalculations = async () => {
  const cpuCount = os.cpus().length;
  const tasks = [];

  for (let i = 0; i < cpuCount; i++) {
    tasks.push(workerPromise(workerPath, baseNum + i));
  }

  const results = await Promise.all(tasks);
  console.log(results);
};

await performCalculations();
