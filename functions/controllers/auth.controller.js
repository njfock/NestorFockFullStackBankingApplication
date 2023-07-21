const { putCollectionUser } = require('../database/database')

const putUser = async (req, res) => {
    console.log('putUser', req.body.email)
    await putCollectionUser({_id: req.body.email, ...req.body});
    res.status(200).json({ message: 'User', data: req.body.email })

}

module.exports = { putUser };