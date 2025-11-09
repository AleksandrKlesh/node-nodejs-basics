import dotenv from 'dotenv';
import { createServer } from './server';

dotenv.config();

const port = Number(process.env.PORT || 4000);

createServer(port).catch(err => { console.error('Failed to start server:', err); process.exit(1); });
