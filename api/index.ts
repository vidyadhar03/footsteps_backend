import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test routes
app.get('/', (req, res) => {
  res.json({ message: 'Footsteps Backend API is running!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/profile', (req, res) => {
  res.status(401).json({ error: 'Missing or invalid authorization header' });
});

export default app; 