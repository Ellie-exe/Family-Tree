import express from 'express'
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose'
import members from '../modals/memberModal.js';
import trees from "../modals/treeModal.js";

const router = express.Router();

const clientId = '740022531730-l28oie7e785fi8n676q35a6nns70lec1.apps.googleusercontent.com';
const client = new OAuth2Client(clientId);

await mongoose.connect('mongodb://127.0.0.1:27017/familyTreeDB');

router.post('/:memberId/partner', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        await members.create({ name: req.body['name'], visible: true }, async (err, newMember) => {
            if (err) return res.sendStatus(500);

            members.findById(req.params['memberId'], async (err, member) => {
                if (err) return res.sendStatus(500);

                member.partner = newMember._id;
                member.save();

                newMember.partner = member._id;
                newMember.save();
            });

            trees.findById(req.params['treeId'], async (err, tree) => {
                if (err) return res.sendStatus(500);

                tree.generation[req.body['generation']].push(newMember._id);
                tree.numMembers++;
                tree.save();

                res.sendStatus(200);
            });
        });
    });
});

router.post('/:memberId/pastPartners', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        await members.create({ name: req.body['name'], visible: true }, async (err, newMember) => {
            if (err) return res.sendStatus(500);

            members.findById(req.params['memberId'], async (err, member) => {
                if (err) return res.sendStatus(500);

                member.pastPartners.push(newMember._id);
                member.save();

                newMember.pastPartners.push(member._id);
                newMember.save();
            });

            trees.findById(req.params['treeId'], async (err, tree) => {
                if (err) return res.sendStatus(500);

                tree.generation[req.body['generation']].push(newMember._id);
                tree.numMembers++;
                tree.save();

                res.sendStatus(200);
            });
        });
    });
});

router.post('/:memberId/parents', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        await members.create({ name: req.body['name'], visible: true }, async (err, newMember) => {
            if (err) return res.sendStatus(500);

            members.findById(req.params['memberId'], async (err, member) => {
                if (err) return res.sendStatus(500);

                member.parents.push(newMember._id);
                member.save();

                newMember.children.push(member._id);
                newMember.save();
            });

            trees.findById(req.params['treeId'], async (err, tree) => {
                if (err) return res.sendStatus(500);

                tree.generation[req.body['generation']].push(newMember._id);
                tree.numMembers++;
                tree.save();

                res.sendStatus(200);
            });
        });
    });
});

router.post('/:memberId/children', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        await members.create({ name: req.body['name'], visible: true }, async (err, newMember) => {
            if (err) return res.sendStatus(500);

            members.findById(req.params['memberId'], async (err, member) => {
                if (err) return res.sendStatus(500);

                member.children.push(newMember._id);
                member.save();

                newMember.parents.push(member._id);
                newMember.save();
            });

            trees.findById(req.params['treeId'], async (err, tree) => {
                if (err) return res.sendStatus(500);

                tree.generation[req.body['generation']].push(newMember._id);
                tree.numMembers++;
                tree.save();

                res.sendStatus(200);
            });
        });
    });
});

router.post('/:memberId/fields', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        members.findById(req.params['memberId'], async (err, member) => {
            if (err) return res.sendStatus(500);

            member.fields.set(req.body['name'], req.body['value']);
            await member.save();

            res.sendStatus(200);
        });
    });
});

router.delete('/:memberId/fields', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        members.findById(req.params['memberId'], async (err, member) => {
            if (err) return res.sendStatus(500);

            member.fields.delete(req.body['name']);
            await member.save();

            res.sendStatus(200);
        });
    });
});

router.delete('/:memberId', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await client.verifyIdToken({ idToken: token, audience: clientId }, async (err) => {
        if (err) return res.sendStatus(401);

        members.findById(req.params['memberId'], async (err, member) => {
            if (err) return res.sendStatus(500);

            member.visible = false;
            await member.save();

            res.sendStatus(200);
        });
    });
});

export default router
