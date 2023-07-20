const { putCollectionUser } = require('../database/database')

const putUser = async (req, res) => {
    console.log('putUser', req.body.email)
    await putCollectionUser({ email: req.body.email });
    res.status(200).json({ message: 'User', data: req.body.email })

}

module.exports = { putUser };