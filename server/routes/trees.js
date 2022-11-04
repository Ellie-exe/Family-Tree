import express from 'express'
const router = express.Router();

import { OAuth2Client } from 'google-auth-library';
const CLIENT_ID = '186520065813-541as043cebcthf0j3571f7f575peqgv.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

import mongoose from 'mongoose'
import treeSchema from '../schemas/treeSchema.js';

await mongoose.connect('mongodb://localhost:27017/familyTreeDB');
const trees = mongoose.model('trees', treeSchema);

router.get('/:id', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.headers['authorization'].split(' ')[1],
        audience: CLIENT_ID
    });

    if (!ticket) return res.sendStatus(401);

    trees.findOne({ _id: req.params['id'] }, (err, tree) => {
        if (err) return res.sendStatus(500);
        res.json(tree);
    });
});

// TODO: finish fixing this route

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
