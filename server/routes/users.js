import express from 'express'
const router = express.Router();

import { OAuth2Client } from 'google-auth-library';
const CLIENT_ID = '740022531730-l28oie7e785fi8n676q35a6nns70lec1.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

import mongoose from 'mongoose'
await mongoose.connect('mongodb://127.0.0.1:27017/familyTreeDB');

import users from '../modals/userModal.js';

router.get('/', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.headers['authorization'].split(' ')[1],
        audience: CLIENT_ID

    }).catch(() => { res.status(401) });
    if (res.statusCode === 401) return res.sendStatus(401);

    users.findOne({ email: ticket.getPayload().email }, async (err, user) => {
        if (err) return res.sendStatus(500);

        await user.populate({ path: 'trees', populate: [{ path: 'users' }, { path: 'members', populate: { path: 'fields' }}]});
        res.json(user);
    });
});

export default router
