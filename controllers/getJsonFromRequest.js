const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    try {
      const form = new formidable.IncomingForm();

      form.parse(req);

      let filename;

      form.on('fileBegin', (name, file) => {
        const fileType = file.type.split('/').pop();

        if (fileType !== 'json') {
          throw new Error('Input file is not a .json');
        }

        filename = `input-${Math.random() * 9}-${file.name}`;
        file.path = path.join(__dirname, filename);
      });

      form.on('file', () => {
        fs.readFile(path.join(__dirname, filename), (err, data) => {
          if (err) {
            throw new Error('Reading Input file failed');
          }

          resolve(JSON.parse(data));

          // Delete file after reading
          fs.unlink(path.join(__dirname, filename), () => {});
        });
      });

      return;
    } catch (error) {
      return reject(error);
    }
  });
};
