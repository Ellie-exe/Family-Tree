import express from 'express';
import path from 'path';

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, '../client/build')));

import tree from './routes/tree';
app.use('/api/tree', tree);

import member from './routes/member';
app.use('/api/member', member);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
