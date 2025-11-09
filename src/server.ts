import http, { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import { db } from './db';
import { jsonResponse, parseJsonBody } from './utils';
import { User } from './types';

function notAllowed(res: ServerResponse) {
  jsonResponse(res, 405, { message: 'Method Not Allowed' });
}

export async function requestHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    const urlObj = parse(req.url || '', true);
    const pathname = urlObj.pathname || '';
    const path = pathname.replace(/\/+$/, '');

    if (path === '/api/users') {
      if (req.method === 'GET') {
        const all = await db.getAll();

        return jsonResponse(res, 200, all);
      }
      if (req.method === 'POST') {
        let body;

        try {
          body = await parseJsonBody(req);
        } catch {
          return jsonResponse(res, 400, { message: 'Invalid JSON' });
        }

        const { username, age, hobbies } = body ?? {};
        if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
          return jsonResponse(res, 400, { message: 'Request body must contain required fields: username(string), age(number), hobbies(array)' });
        }
        const newUser: User = { id: uuidv4(), username, age, hobbies };
        const created = await db.create(newUser);
        return jsonResponse(res, 201, created);
      }
      return notAllowed(res);
    }

    const match = path.match(/^\/api\/users\/([^/]+)$/);
    if (match) {
      const userId = match[1];
      if (!validateUUID(userId)) {
        return jsonResponse(res, 400, { message: 'Invalid userId (not a valid UUID)' });
      }

      if (req.method === 'GET') {
        const user = await db.getById(userId); 
        if (!user) {
          return jsonResponse(res, 404, { message: 'User not found' });
        }
        return jsonResponse(res, 200, user);
      }

      if (req.method === 'PUT') {
        let body;

        try { 
          body = await parseJsonBody(req); 
        } catch { 
          return jsonResponse(res, 400, { message: 'Invalid JSON' }); 
        }

        const { username, age, hobbies } = body ?? {};

        if ((username !== undefined && typeof username !== 'string') ||
            (age !== undefined && typeof age !== 'number') ||
            (hobbies !== undefined && !Array.isArray(hobbies))) {
          return jsonResponse(res, 400, { message: 'Invalid fields in body' });
        }
        const updated = await db.update(userId, { username, age, hobbies });
        if (!updated) {
          return jsonResponse(res, 404, { message: 'User not found' });
        }
        return jsonResponse(res, 200, updated);
      }

      if (req.method === 'DELETE') {
        const existed = await db.getById(userId); 
        if (!existed) {
          return jsonResponse(res, 404, { message: 'User not found' });
        }
        await db.remove(userId); 
        res.writeHead(204); 
        return res.end();
      }

      return notAllowed(res);
    }

    return jsonResponse(res, 404, { message: 'Not Found' });
  } catch (err) {
    console.error('Server error:', err);
    return jsonResponse(res, 500, { message: 'Internal Server Error' });
  }
}

export function createServer(port: number) {
  const server = http.createServer(requestHandler);
  return new Promise<void>((resolve) => {
    server.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
      resolve();
    });
  });
}