import express from 'express'
const router = express.Router();

import { OAuth2Client } from 'google-auth-library';
const CLIENT_ID = '186520065813-541as043cebcthf0j3571f7f575peqgv.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

import mongoose from 'mongoose'
import userSchema from '../schemas/userSchema.js';
import treeSchema from '../schemas/treeSchema.js';

await mongoose.connect('mongodb://localhost:27017/familyTreeDB');
const users = mongoose.model('users', userSchema);
const trees = mongoose.model('trees', treeSchema);

router.get('/trees', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.headers['authorization'].split(' ')[1],
        audience: CLIENT_ID
    });

    if (!ticket) return res.sendStatus(401);

    users.findOne({ email: ticket.getPayload().email }, (err, user) => {
        if (err) return res.sendStatus(500);

        // TODO: consider using populate to get the trees

        trees.find({ users: [user._id] }, (err, trees) => {
            if (err) return res.sendStatus(500);
            res.json(trees);
        });
    });
});

router.post('/trees', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.headers['authorization'].split(' ')[1],
        audience: CLIENT_ID
    });

    if (!ticket) return res.sendStatus(401);

    users.findOne({ email: ticket.getPayload().email }, (err, user) => {
        if (err) return res.sendStatus(500);

        trees.create({
            users: [user._id],
            numMembers: 0

        }, (err, tree) => {
            if (err) return res.sendStatus(500);
            user.trees.push({ canEdit: true, tree: tree._id });
        });
    });
});

router.delete('/trees/:id', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.headers['authorization'].split(' ')[1],
        audience: CLIENT_ID
    });

    if (!ticket) return res.sendStatus(401);

    users.findOne({ email: ticket.getPayload().email }, (err, user) => {
        if (err) return res.sendStatus(500);

        // TODO: remove tree from user.trees

        trees.deleteOne({ _id: req.params['id'] }, (err) => {
            if (err) return res.sendStatus(500);
        });
    });
});

export default router
