const fs = require('fs');
const path = require('path');

fs.access(path.join(__dirname, 'files-copy'), fs.constants.F_OK, (err) => {
  if (err) return copyDir();
  else {
    fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
      if (err) throw err;

      if (files.length === 0) {
        copyDir();
      } else {
        let fileLength = files.length;
        files.forEach((file) => {
          fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
            if (err) throw err;
            fileLength--;
            if (fileLength === 0) {
              copyDir();
            }
          });
        });
      }
    });
  }
});

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;

    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
      if (err) throw err;

      if (files.length === 0) {
        return;
      }

      let filesToCopy = files.length;

      files.forEach((file) => {
        fs.copyFile(
          path.join(__dirname, 'files', file),
          path.join(__dirname, 'files-copy', file),
          (err) => {
            if (err) throw err;
            filesToCopy--;
            if (filesToCopy === 0) {
              console.log('files copied');
            }
          },
        );
      });
    });
  });
}
