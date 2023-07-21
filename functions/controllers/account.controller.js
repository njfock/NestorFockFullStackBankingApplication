const admin = require("firebase-admin");
const { getCollectionAccount, updateCollectionAccount, getCollectionAccounts } = require('../database/database')

const getAccount = async (req, res) => {
    const { email } = await admin.auth().verifyIdToken(req.headers.token)
    const data = await getCollectionAccount({_id:email});
    return res.json({ message: 'account',  data: data})
}

const getAccounts = async (req, res) => {
    const data = await getCollectionAccounts();
    return res.json({ message: 'account',  data: data})
}

const updateAccount = async (req, res) => {
    const { email } = await admin.auth().verifyIdToken(req.headers.token)
    const data = await updateCollectionAccount({_id:email, ...req.body});
    return res.json({ message: 'account',  data: data})
}
module.exports = { getAccount, updateAccount, getAccounts };