const express = require('express');
const router = express.Router();

const { getUserDetails, getOrgDetails } = require('./Controllers/usersUtil')

router.get('/me', getUserDetails)
router.get('/:userId/organizations', getOrgDetails)

module.exports = router