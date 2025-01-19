const path = require('path');
const fs = require('fs');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          const filePath = path.join(__dirname, 'secret-folder', file.name);
          const extensionFile = path.extname(file.name).slice(1);
          const nameFile = path.parse(file.name).name;
          fs.stat(filePath, (err, stats) => {
            if (err) throw err;
            console.log(`${nameFile} - ${extensionFile} - ${stats.size}`);
          });
        }
      });
    }
  },
);
