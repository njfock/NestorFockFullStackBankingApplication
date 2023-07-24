const { putCollection } = require('../database/dal')

const putUser = async (req, res) => {
    await putCollection({_id: req.body.email, ...req.body});
    res.status(200).json({ message: 'User', data: req.body.email })
}

module.exports = { putUser };