const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public', {
    // extensions: ['html', 'htm']
}));

// Temporary state to store active streamers
const activeStreamers = new Set();

app.get('/creators', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'setup_error.html'));
});


app.get('/creators/:streamerName', (req, res) => {
    const streamerName = req.params.streamerName;

    // Add streamerName to the activeStreamers set
    activeStreamers.add(streamerName);

    // Serve the creators.html file
    res.sendFile(path.join(__dirname, 'public', 'creators.html'));
});

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

app.get('/api/active_streamers', (req, res) => {
    res.json(Array.from(activeStreamers));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});