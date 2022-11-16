import express from 'express'
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose'
import trees from '../modals/treeModal.js';
import users from '../modals/userModal.js';
import members from '../modals/memberModal.js';

const router = express.Router();

const clientId = '740022531730-l28oie7e785fi8n676q35a6nns70lec1.apps.googleusercontent.com';
const client = new OAuth2Client(clientId);

await mongoose.connect('mongodb://127.0.0.1:27017/familyTreeDB');

router.get('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err, ticket) => {
        if (err) return res.sendStatus(401);

        users.findOne({ email: ticket.getPayload().email }, async (err, user) => {
            if (err) {
                await users.create({ email: ticket.getPayload().email }, async (err, newUser) => {
                    user = newUser;
                });
            }
            await user.populate('trees');
            res.json({ 'trees': user.trees });
        });
    });
});

router.get('/:treeId', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        trees.findById(req.params['treeId'], async (err, tree) => {
            if (err) return res.sendStatus(500);
            res.json({ 'tree': tree });
        });
    });
});

router.post('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err, ticket) => {
        if (err) return res.sendStatus(401);

        await trees.create({ name: req.body['name'] }, async (err, tree) => {
            if (err) return res.sendStatus(500);

            // await members.create({ name: 'You', visible: true }, async (err, member) => {
            //     tree.generation[0].push(member._id);
            //     tree.numMembers++;
            //     tree.save();
            // });

            users.findOne({ email: ticket.getPayload().email }, async (err, user) => {
                if (err) return res.sendStatus(500);

                user.trees.push(tree._id);
                await user.save();

                res.sendStatus(200);
            });
        });
    });
});

router.post('/:treeID/members', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({idToken: token, audience: clientId}, async (err, ticket) => {
        if (err) return res.sendStatus(401);

        await members.create({ name: req.body['name'], visible: true }, async (err, member) => {
            if (err) return res.sendStatus(500);

            trees.findById(req.params['treeId'], async (err, tree) => {
                if (err) return res.sendStatus(500);

                tree.members.push(member._id);
                tree.numMembers++;
                tree.save();

                res.sendStatus(200);
            });
        });
    });
});

router.post('/:treeId/users', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        users.findOne({ email: req.body['email'] }, async (err, user) => {
            if (err) return res.sendStatus(500);

            trees.findById(req.params['treeId'], async (err, tree) => {
                if (err) return res.sendStatus(500);

                tree.users.set(req.body['email'], req.body['canEdit']);
                user.trees.push(tree._id);

                await tree.save();
                await user.save();

                res.sendStatus(200);
            });
        });
    });
});

router.delete('/:treeId/users', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        users.findOne({ email: req.body['email'] }, async (err, user) => {
            if (err) return res.sendStatus(500);

            trees.findById(req.params['treeId'], async (err, tree) => {
                if (err) return res.sendStatus(500);

                tree.users.delete(req.body['email']);
                user.trees = user.trees.filter(tree => tree !== req.params['treeID']);

                await tree.save();
                await user.save();

                res.sendStatus(200);
            });
        });
    });
});

router.delete('/:treeID', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        users.find({ trees: [req.params['treeId']] }, async (err, users) => {
            if (err) return res.sendStatus(500);

            for (const user of users) {
                user.trees = user.trees.filter(tree => tree !== req.params['treeId']);
                await user.save();
            }

            trees.findByIdAndDelete(req.params['treeId'], async (err) => {
                if (err) return res.sendStatus(500);
            });

            res.sendStatus(200);
        });
    });
});

export default router
