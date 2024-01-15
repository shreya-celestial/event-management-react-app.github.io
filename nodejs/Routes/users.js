const express = require('express');
const router = express.Router();
const { tokenDetails, orgDetails } = require('../Controllers/usersUtil')

router.get('/me', tokenDetails)
router.get('/:userId/organizations', orgDetails)

module.exports = router;