// Simple icon creator using Node.js
// Creates basic PNG icons for the PWA

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon and convert to PNG using data URL
function createSVGIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#0a0a0a"/>
    <rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.9}" height="${size * 0.9}" fill="none" stroke="#10a37f" stroke-width="${size * 0.03}"/>
    <text x="50%" y="42%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.35}" font-weight="bold" fill="#10a37f">xAI</text>
    <text x="50%" y="70%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.12}" fill="#10a37f">POCKET TRAINER</text>
  </svg>`;
}

// Save SVG files as placeholders
const svg192 = createSVGIcon(192);
const svg512 = createSVGIcon(512);

fs.writeFileSync(path.join(__dirname, 'icons', 'icon-192.svg'), svg192);
fs.writeFileSync(path.join(__dirname, 'icons', 'icon-512.svg'), svg512);

console.log('✅ SVG icons created successfully!');
console.log('📝 Note: For PNG icons, open generate-icons.html in your browser');
console.log('   and click "Generate & Download Icons", then move the downloaded');
console.log('   files to the icons/ folder.');
