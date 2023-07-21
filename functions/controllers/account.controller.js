const admin = require("firebase-admin");
const { getCollectionAccount, updateCollectionAccount } = require('../database/database')

const getAccount = async (req, res) => {
    console.log('getAccount')
    const { email } = await admin.auth().verifyIdToken(req.headers.token)
    const data = await getCollectionAccount({_id:email});
    return res.json({ message: 'account',  data: data})
}
const updateAccount = async (req, res) => {
    console.log('updateAccount', req.body)
    const { email } = await admin.auth().verifyIdToken(req.headers.token)
    const data = await updateCollectionAccount({_id:email, ...req.body});
    return res.json({ message: 'account',  data: data})
}
module.exports = { getAccount, updateAccount };