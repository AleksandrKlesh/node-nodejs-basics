import { IncomingMessage, ServerResponse } from 'http';

export function jsonResponse(res: ServerResponse, status: number, data?: any) {
  res.writeHead(status, { 'Content-Type': 'application/json' });

  if (data === undefined) {
    return res.end();
  }
  
  res.end(JSON.stringify(data));
}

export async function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch { reject(new Error('Invalid JSON')); }
    });

    req.on('error', err => reject(err));
  });
}