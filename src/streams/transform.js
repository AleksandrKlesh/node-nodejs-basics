import { Transform, pipeline } from 'node:stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split("").reverse().join('');
      callback(null, reversed);
    }
  })
  pipeline(process.stdin, reverseStream, process.stdout, (err) => {
    if (err) {
      console.error('FS operation failed', err);
    }
  });
};

await transform();
