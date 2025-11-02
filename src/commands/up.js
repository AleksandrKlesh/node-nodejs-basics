import path from 'path';
import { isSafePath } from '../isSafePath.js';

export default function up(current) {
  const parent = path.dirname(current);
  return isSafePath(parent) ? parent : current;
}