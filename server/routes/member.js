import express from 'express'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost:27017/test');
const router = express.Router
router.use(express.json());

import memberSchema from '../schemas/memberSchema';
const Members = mongoose.model('Members', memberSchema);

router.get('/:id', (req, res) => {
    Members.findOne({ id: req.params.id }, (err, member) => {
        if (err) {res.sendStatus(404); }
        else { res.json(member); }
    });
});

router.post('/:id', (req, res) => {
    Members.findOneAndUpdate({ id: req.params.id }, req.body, (err, member) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

router.delete('/:id', (req, res) => {
    Members.findOneAndDelete({ id: req.params.id }, (err, member) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

export default router
