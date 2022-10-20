import express from 'express'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost:27017/test');
const router = express.Router
router.use(express.json());

import treeSchema from '../schemas/treeSchema';
const Trees = mongoose.model('Trees', treeSchema);

router.get('/:id', (req, res) => {
    Trees.findOne({ id: req.params.id }, (err, tree) => {
        if (err) {res.sendStatus(404); }
        else { res.json(tree); }
    });
});

router.post('/:id', (req, res) => {
    Trees.findOneAndUpdate({ id: req.params.id }, req.body, (err, tree) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

router.delete('/:id', (req, res) => {
    Trees.findOneAndDelete({ id: req.params.id }, (err, tree) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

export default router
