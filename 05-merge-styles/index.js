const path = require('path');
const fs = require('fs');

function init() {
  fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    '',
    (err) => {
      if (err) throw err;
    },
  );
}

init();

fs.access(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  fs.constants.F_OK,
  (err) => {
    if (err) init();

    const whiteStream = fs.createWriteStream(
      path.join(__dirname, 'project-dist', 'bundle.css'),
      { flags: 'a' },
    );

    fs.readdir(
      path.join(__dirname, 'styles'),
      { withFileTypes: true },
      (err, files) => {
        if (err) throw err;
        else {
          files.forEach((file) => {
            const fileName = file.name;
            const extensionFile = path.extname(fileName);

            if (file.isFile() && extensionFile === '.css') {
              const stream = fs.createReadStream(
                path.join(__dirname, 'styles', fileName),
                'utf-8',
              );
              stream.on('data', (chunk) => whiteStream.write(chunk));
            }
          });
        }
      },
    );
  },
);
