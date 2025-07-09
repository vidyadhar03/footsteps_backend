import { PrismaClient } from '../generated/prisma';

// Create Prisma client instance
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
}); 