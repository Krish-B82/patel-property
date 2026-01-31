const dotenv = require('dotenv');
dotenv.config();

console.log('Checking environment...');
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is missing!');
    process.exit(1);
} else {
    console.log('✅ DATABASE_URL is present');
}

if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET is missing!');
    process.exit(1);
} else {
    console.log('✅ JWT_SECRET is present');
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('Connecting to database...');
prisma.$connect()
    .then(() => {
        console.log('✅ Database connected successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    });
