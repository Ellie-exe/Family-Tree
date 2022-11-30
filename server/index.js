import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from 'cors';

const app = express();
const PORT = 443;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors({
    origin: 'https://familtree.xyz'
}))

app.use(express.json());

// TODO: Add a verification middleware and then call next

import members from './routes/members.js';
app.use('/api/members', members);

import tests from './routes/tests.js';
app.use('/api/tests', tests);

import trees from './routes/trees.js';
app.use('/api/trees', trees);

import users from './routes/users.js';
app.use('/api/users', users);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
