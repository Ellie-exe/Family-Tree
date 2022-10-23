import express from 'express'
import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost:27017/familyTreeDB');
const router = express.Router
router.use(express.json());

import treeSchema from '../schemas/treeSchema.js';
const trees = mongoose.model('trees', treeSchema);

router.get('/:id', (req, res) => {
    trees.findOne({ id: req.params.id }, (err, tree) => {
        if (err) { res.sendStatus(404); }
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

router.create('/:id/members', async (req, res) => {
    import memberSchema from '../schemas/memberSchema.js';
    const members = mongoose.model('members', memberSchema);

    await members.create({}, (err, member) => {
        if (err) { res.sendStatus(404); }

        trees.findOne({ id: req.params.id }, (err, tree) => {
            if (err) { res.sendStatus(404); }

            tree.members.push(member);
        });
    });
});

export default router
