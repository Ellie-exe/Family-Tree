import express from 'express'
const router = express.Router();

import { OAuth2Client } from 'google-auth-library';
const CLIENT_ID = '740022531730-l28oie7e785fi8n676q35a6nns70lec1.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

import mongoose from 'mongoose'
await mongoose.connect('mongodb://127.0.0.1:27017/familyTreeDB');

import users from '../modals/userModal.js';
import trees from '../modals/treeModal.js';
import members from '../modals/memberModal.js';
import fields from '../modals/fieldModal.js';

router.get('/1', async (req, res) => {
    users.findOne({ email: 'ryiscool247@gmail.com' }, async (err, user) => {
        await trees.create({ name: 'Test Tree' }, async (err, tree) => {
            await members.create({ name: 'John Doe' }, async (err, member) => {
                await fields.create({ name: 'Occupation', value: 'Test Dummy' }, async (err, field) => {
                    member.fields.push(field._id);
                    await member.save();

                    tree.members.push(member._id);
                    tree.users.push(user._id);
                    await tree.save();

                    user.trees.push(tree._id);
                    await user.save();

                    await tree.populate({ path: 'members', populate: { path: 'fields' }});

                    res.json(tree);
                });
            });
        });
    });
});

router.get('/2', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.headers['authorization'].split(' ')[1]
    });

    if (!ticket) return res.sendStatus(401);

    res.json({ email: ticket.getPayload().email });
});

export default router
