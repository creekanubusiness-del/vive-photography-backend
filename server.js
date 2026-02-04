const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({ message: 'Uploaded!', file: req.file.filename });
});
const fs = require('fs');

app.get('/photos', (req, res) => {
  fs.readdir('images', (err, files) => {
    if (err) return res.status(500).send('Error');
    res.json(files);
  });
});
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
