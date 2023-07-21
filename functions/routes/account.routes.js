const { Router } = require("express");
const router = Router();

const { getAccount, updateAccount } = require('../controllers/account.controller');

router.post('/account/get', getAccount)
router.post('/account/update', updateAccount)

module.exports = router;