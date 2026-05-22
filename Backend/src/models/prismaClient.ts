import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';
import { PrismaClient } from '../../prisma/generated/client/client';

// Resolve o caminho absoluto do banco SQLite
const dbPath = path.resolve(__dirname, '../../prisma/dev.db');
const dbUrl = `file:${dbPath}`;

// Inicializa o adapter LibSQL para SQLite local (Prisma 7)
const adapter = new PrismaLibSql({ url: dbUrl });

// Log temporário para depuração do caminho do DB em runtime
console.log('[prismaClient] usando dbUrl =', dbUrl);
export const prisma = new PrismaClient({ adapter });
