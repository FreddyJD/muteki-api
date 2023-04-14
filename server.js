const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/ads', (req, res) => {
  const adFolderPath = path.join(__dirname, 'public', 'ads');
  fs.readdir(adFolderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading ad folder');
      return;
    }
    const imageURLs = files.map(file => `/ads/${file}`);
    res.json(imageURLs);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});