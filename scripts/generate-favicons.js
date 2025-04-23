const fs = require('fs');
const path = require('path');
const svg2png = require('svg2png');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SVG_PATH = path.join(PUBLIC_DIR, 'favicon.svg');

async function generateFavicons() {
  try {
    const svgBuffer = fs.readFileSync(SVG_PATH);
    console.log('SVG loaded successfully');

    // Generate favicon-16x16.png
    const png16 = await svg2png(svgBuffer, { width: 16, height: 16 });
    fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), png16);
    console.log('Generated favicon-16x16.png');

    // Generate favicon-32x32.png
    const png32 = await svg2png(svgBuffer, { width: 32, height: 32 });
    fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), png32);
    console.log('Generated favicon-32x32.png');

    // Generate apple-touch-icon.png (180x180)
    const pngApple = await svg2png(svgBuffer, { width: 180, height: 180 });
    fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), pngApple);
    console.log('Generated apple-touch-icon.png');

    // Generate android-chrome-192x192.png
    const pngAndroid192 = await svg2png(svgBuffer, { width: 192, height: 192 });
    fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'), pngAndroid192);
    console.log('Generated android-chrome-192x192.png');

    // Generate android-chrome-512x512.png
    const pngAndroid512 = await svg2png(svgBuffer, { width: 512, height: 512 });
    fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'), pngAndroid512);
    console.log('Generated android-chrome-512x512.png');

    console.log('All favicons generated successfully');
  } catch (err) {
    console.error('Error generating favicons:', err);
  }
}

generateFavicons(); 