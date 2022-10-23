import express from 'express'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost:27017/familyTreeDB');
const router = express.Router
router.use(express.json());

import treeSchema from '../schemas/treeSchema.js';
const trees = mongoose.model('trees', treeSchema);

router.get('/:id', (req, res) => {
    trees.findOne({ id: req.params.id }, (err, tree) => {
        if (err) {res.sendStatus(404); }
        else { res.json(tree); }
    });
});

router.post('/:id', (req, res) => {
    trees.findOneAndUpdate({ id: req.params.id }, req.body, (err, tree) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

router.delete('/:id', (req, res) => {
    trees.findOneAndDelete({ id: req.params.id }, (err, tree) => {
        if (err) { res.sendStatus(404); }
        else { res.sendStatus(200); }
    });
});

export default router
