import express from 'express';
import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// app.use(express.static(path.join(__dirname, '../client/build')));

// import trees from './routes/trees.js';
// app.use('/api/trees', trees);
//
// import member from './routes/member.js';
// app.use('/api/member', member);

import user from './routes/user.js';
app.use('/api/user', user);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
