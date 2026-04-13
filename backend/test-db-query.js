require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const prop = await prisma.property.create({
      data: {
        code: 'TEST-DEL-1',
        title: 'Test Delete Property',
        description: 'Testing delete API endpoint',
        min_price: 1000,
        max_price: 2000,
        location: 'Gotri',
        city: 'Vadodara',
        bathrooms: 2,
        bedrooms: 2,
        area_sqft: 1000,
        property_type: 'apartment',
        status: 'available',
        images: ['https://dummyimage.com/600x400/000/fff']
      }
    });
    console.log(`Created property ID: ${prop.id}`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
