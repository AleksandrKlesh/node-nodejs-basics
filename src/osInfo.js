import os from 'os';

export default function osInfo(option) {
  switch (option) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Overall amount of CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) =>
        console.log(`${index + 1}. ${cpu.model} - ${(cpu.speed / 1000).toFixed(2)} GHz`)
      );
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(process.arch);
      break;
    default:
      console.log('Invalid input');
  }
}