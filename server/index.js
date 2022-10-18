const express = require('express');
const path = require('path');

const app = express();
const PORT = 80;

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api', (req, res) => {
    res.json({ message: 'This text was fetched from our API!' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
