import { OAuth2Client } from 'google-auth-library';
import express from 'express'

const CLIENT_ID = '186520065813-541as043cebcthf0j3571f7f575peqgv.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);
const router = express.Router

export const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];
}

router.post('/', (req, res) => {
    const token = req.body.token;
    verify(token)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(() => {
            res.sendStatus(404);
        });
});

export default router
