import os from 'os';
import { printCurrentDir } from './printCurrentDir.js';
import { parseArgs, splitCommand } from './parseInput.js';
import { printWelcome, printGoodbye, invalid, opFailed } from './printMessages.js';

import up from './commands/up.js';
import cd from './commands/cd.js';
import ls from './commands/ls.js';
import cat from './commands/cat.js';
import add from './commands/add.js';
import mkdir from './commands/mkdir.js';
import rn from './commands/rn.js';
import cp from './commands/cp.js';
import mv from './commands/mv.js';
import rm from './commands/rm.js';

import osInfo from './osInfo.js';
import hash from './hash.js';
import compress from './compression/compress.js';
import decompress from './compression/decompress.js';

const username = parseArgs(process.argv);

printWelcome(username);

let currentDir = os.homedir();

printCurrentDir(currentDir);
process.stdout.write('> ');

process.on('SIGINT', () => {
  printGoodbye(username);
  process.exit(0);
});

process.stdin.on('data', async (data) => {
  const line = data.toString().trim();

  if (!line) {
    process.stdout.write('> ');
    return;
  }

  const [command, ...args] = splitCommand(line);

  if (command === '.exit') {
    printGoodbye(username);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'up': currentDir = up(currentDir); break;
      case 'cd': currentDir = await cd(args[0], currentDir); break;
      case 'ls': await ls(currentDir); break;
      case 'cat': await cat(args[0], currentDir); break;
      case 'add': await add(args[0], currentDir); break;
      case 'mkdir': await mkdir(args[0], currentDir); break;
      case 'rn': await rn(args[0], args[1], currentDir); break;
      case 'cp': await cp(args[0], args[1], currentDir); break;
      case 'mv': await mv(args[0], args[1], currentDir); break;
      case 'rm': await rm(args[0], currentDir); break;
      case 'os': osInfo(args[0]); break;
      case 'hash': await hash(args[0], currentDir); break;
      case 'compress': await compress(args[0], args[1], currentDir); break;
      case 'decompress': await decompress(args[0], args[1], currentDir); break;
      default: invalid();
    }
  } catch {
    opFailed();
  }

  printCurrentDir(currentDir);
  process.stdout.write('> ');
});
