// scripts/test-db.ts
import { PrismaClient } from '@prisma/client';

// This script needs to manually load environment variables
// especially when run outside of `next dev`.
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Mencoba menyambungkan ke database...');
    // The $connect() method is a direct way to test the database connection.
    await prisma.$connect();
    console.log('✅ Koneksi Aman! Database berhasil tersambung.');
    
    // Optional: You can also try a simple query
    const accountCount = await prisma.account.count();
    console.log(`✅ Berhasil melakukan query: Ditemukan ${accountCount} akun.`);

  } catch (error) {
    console.error('❌ Gagal Connect: Terjadi kesalahan saat mencoba menyambung ke database.');
    console.error(error);
    process.exit(1); // Exit with an error code
  } finally {
    // Always disconnect from the database
    await prisma.$disconnect();
  }
}

main();
