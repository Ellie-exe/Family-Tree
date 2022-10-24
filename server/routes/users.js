import express from 'express'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost:27017/familyTreeDB');
const router = express.Router
router.use(express.json());

import userSchema from '../schemas/userSchema.js';
const users = mongoose.model('users', userSchema);

router.get('/:email', (req, res) => {
    users.findOne({ id: req.params.email }, (err, user) => {
        if (err) {res.sendStatus(404); }
        else { res.json(user); }
    });
});

router.post('/:id', (req, res) => {
    users.findOneAndUpdate({ id: req.params.id }, req.body, (err, user) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

router.delete('/:id', (req, res) => {
    users.findOneAndDelete({ id: req.params.id }, (err, user) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

export default router
