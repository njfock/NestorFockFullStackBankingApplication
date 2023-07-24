const admin = require("firebase-admin");
const { getCollection, updateCollection, getCollections } = require('../database/dal')

const getAccount = async (req, res) => {
    const { email } = await admin.auth().verifyIdToken(req.headers.token)
    const data = await getCollection({_id:email});
    return res.json({ message: 'account',  data: data})
}

const getAccounts = async (req, res) => {
    const data = await getCollections();
    return res.json({ message: 'account',  data: data})
}

const updateAccount = async (req, res) => {
    const { email } = await admin.auth().verifyIdToken(req.headers.token)
    const data = await updateCollection({_id:email, ...req.body});
    return res.json({ message: 'account',  data: data})
}

module.exports = { getAccount, updateAccount, getAccounts };