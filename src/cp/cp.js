import path from "path";
import {fileURLToPath} from "url";
import { fork } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, "files", "script.js")

const spawnChildProcess = async (args) => {
  fork(scriptPath, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['argument1', 'argument2', 'argument3', 'argument4', 'argument5']);
