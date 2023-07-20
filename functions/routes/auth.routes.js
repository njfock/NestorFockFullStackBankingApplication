const { Router } = require("express");
const router = Router();

const { putUser } = require('../controllers/auth.controller')

router.post('/register', putUser)

module.exports = router;