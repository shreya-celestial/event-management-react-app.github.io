const express = require('express');
const router = express.Router();

const { getEvent, updateEvent, deleteEvent } = require('../Controllers/eventsUtil')

// router.get('/:id', getEvent)
// router.post('/:id', updateEvent)
// router.delete('/:id', deleteEvent)

router.route('/:id').get(getEvent).post(updateEvent).delete(deleteEvent)

module.exports = router;