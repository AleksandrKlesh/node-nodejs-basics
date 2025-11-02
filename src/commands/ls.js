import fs from 'fs/promises';

export default async function ls(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  const folders = items.filter(folder => folder.isDirectory()).map(folder => folder.name).sort();
  const files = items.filter(file => file.isFile()).map(file => file.name).sort();

  folders.forEach(f => console.log(`${f}\t<DIR>`));
  files.forEach(f => console.log(`${f}\t<FILE>`));
}