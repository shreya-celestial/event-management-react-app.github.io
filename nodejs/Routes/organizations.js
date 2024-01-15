const express = require('express');
const router = express.Router();

const { getOrgEvents, postNewEvent } = require('../Controllers/organizationsUtil')

// router.get('/:orgId/events', getOrgEvents)
// router.post('/:orgId/events', postNewEvent)

router.route('/:orgId/events').get(getOrgEvents).post(postNewEvent)

module.exports = router;