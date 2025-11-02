export function printWelcome(name) {
  console.log(`\nWelcome to the File Manager, ${name}!\n`);
}

export function printGoodbye(name) {
  console.log(`\nThank you for using File Manager, ${name}, goodbye!\n`);
}

export function invalid() {
  console.log('\nInvalid input\n');
}

export function opFailed() {
  console.log('\nOperation failed\n');
}