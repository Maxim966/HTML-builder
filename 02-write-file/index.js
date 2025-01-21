const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// функция для создания файла
function init() {
  fs.writeFile(path.join(__dirname, 'text.txt'), '', (error) => {
    if (error) throw error;
  });
}

fs.access('text.txt', fs.constants.F_OK, (error) => {
  if (error) init();
  console.log('Enter text to add to file:');
  rl.on('line', (input) => {
    if (input === 'exit') {
      console.log('Adding text to file stopped. Bye!');
      rl.close();
      return;
    }
    fs.appendFile(path.join(__dirname, 'text.txt'), input + '\n', (err) => {
      if (err) throw err;
    });
  });
});

rl.on('SIGINT', () => {
  console.log('Adding text to file stopped. Bye!');
  rl.close();
});
