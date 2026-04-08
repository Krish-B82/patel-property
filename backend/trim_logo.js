const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'c:\\Users\\krish\\OneDrive\\Desktop\\patel property\\frontend\\patel-property\\src\\assets\\patel.svg';
const png32 = 'c:\\Users\\krish\\OneDrive\\Desktop\\patel property\\frontend\\patel-property\\public\\favicon-32x32.png';
const png16 = 'c:\\Users\\krish\\OneDrive\\Desktop\\patel property\\frontend\\patel-property\\public\\favicon-16x16.png';
const apple = 'c:\\Users\\krish\\OneDrive\\Desktop\\patel property\\frontend\\patel-property\\public\\apple-touch-icon.png';

async function processLogo() {
  try {
    const trimmed = sharp(inputPath).trim();
    const buffer = await trimmed.toBuffer();
    
    await sharp(buffer).resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toFile(png32);
    await sharp(buffer).resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toFile(png16);
    await sharp(buffer).resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toFile(apple);
    
    console.log("Success! Icons successfully trimmed, cropped, and perfectly shaped!");
  } catch(e) {
    console.error("Error processing graphics:", e);
  }
}
processLogo();
