"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("../generated/prisma");
exports.prisma = new prisma_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
process.on('beforeExit', async () => {
    await exports.prisma.$disconnect();
});
//# sourceMappingURL=database.js.map