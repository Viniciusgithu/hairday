import { prisma } from '../src/models/prismaClient';

async function main() {
  const sql = `CREATE TABLE IF NOT EXISTS "Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`;

  try {
    console.log('[create_tables] executando SQL de criação de tabela...');
    await prisma.$executeRawUnsafe(sql);
    console.log('[create_tables] tabela criada ou já existente.');
  } catch (err) {
    console.error('[create_tables] erro ao criar tabela:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
