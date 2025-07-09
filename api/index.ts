import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req;

  if (url === '/' || url === '/api') {
    res.status(200).json({ message: 'Footsteps Backend API is running!' });
  } else if (url === '/health' || url === '/api/health') {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  } else if (url === '/profile' || url === '/api/profile') {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
} 