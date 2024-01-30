const express = require('express');
const router = express.Router();

const { getOrgEvents, postNewEvent } = require('./Controllers/organizationsUtil')

router.route('/:orgId/events').get(getOrgEvents).post(postNewEvent)

module.exports = router