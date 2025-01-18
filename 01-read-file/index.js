const fs = require('fs');
const path = require('path');

const readableSteam = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);
readableSteam.on('data', (chuck) => console.log(chuck));
