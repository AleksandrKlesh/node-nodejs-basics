import cluster from 'cluster';
import os from 'os';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT || 4000);
const cpus = Math.max(1, os.availableParallelism ? os.availableParallelism() : os.cpus().length);
const workerCount = Math.max(1, cpus - 1);

if (cluster.isPrimary) {
  console.log(`Primary process. Spawning ${workerCount} workers...`);
  for (let i = 0; i < workerCount; i++) {
    const env = { ...process.env, PORT: String(PORT + i + 1), WORKER_ID: String(i + 1) };
    cluster.fork(env);
  }

  const workerAddresses = Array.from({ length: workerCount }, (_, i) => ({ port: PORT + i + 1 }));
  let rr = 0;

  const balancer = http.createServer((req, res) => {
    const target = workerAddresses[rr];
    rr = (rr + 1) % workerAddresses.length;
    const options = {
      hostname: '127.0.0.1',
      port: target.port,
      path: req.url,
      method: req.method,
      headers: req.headers
    };

    const proxyReq = http.request(options, proxyRes => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Bad gateway', error: String(err) }));
    });
    
    req.pipe(proxyReq, { end: true });
  });

  balancer.listen(PORT, () => {
    console.log(`Load balancer listening on http://localhost:${PORT}`);
    console.log(`Workers listening on ports: ${workerAddresses.map(w => w.port).join(', ')}`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died.`);
  });

} else {
  (async () => {
    const { createServer } = await import('./server');
    const port = Number(process.env.PORT);
    await createServer(port);
  })();
}
