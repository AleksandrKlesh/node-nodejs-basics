export function parseArgs(argv) {
  const arg = argv.find(a => a.startsWith('--username='));
  return arg?.split("=")[1] ?? "Anonymous";
}

export function splitCommand(input) {
  return input.split(/\s+/);
}