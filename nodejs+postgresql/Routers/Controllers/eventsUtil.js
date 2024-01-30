const { getEventById, updateEventById, deleteEventById } = require('../../repos/eventRepo')
const { convertRowsToEvents, convertBodyForUpdate } = require('./globalUtils')

const getEvent = async (req, res) => {
  const { id } = req.params;
  if (id) {
    if (+id == id) {
      const tableData = await getEventById(id)
      if (tableData && tableData.length > 0) {
        const events = convertRowsToEvents(tableData)
        return res.status(200).json(events[0])
      }
      return res.status(404).json({ error: 'NOT_FOUND' })
    }
    return res.status(404).json({ error: 'NOT_FOUND' })
  }
  return res.status(400).json({ error: true, msg: 'Please provide event id' })
}

const updateEvent = async (req, res) => {
  const { id } = req.params
  if (id) {
    if (+id == id) {
      let { event } = req.body;
      event = convertBodyForUpdate(id, event)
      const tableData = await updateEventById(event)
      if (tableData && tableData.length > 0) {
        const events = convertRowsToEvents(tableData)
        return res.status(202).json(events[0])
      }
      return res.status(404).json({ error: 'NOT_FOUND' })
    }
    return res.status(404).json({ error: 'NOT_FOUND' })
  }
  return res.status(400).json({ error: true, msg: 'Please provide event id' })
}

const deleteEvent = async (req, res) => {
  const { id } = req.params
  if (id) {
    if (+id == id) {
      const tableData = await deleteEventById(id);
      if (tableData && tableData.length > 0) {
        return res.status(200).json({ success: true, msg: 'Deleted successfully!' })
      }
      return res.status(404).json({ error: 'NOT_FOUND' })
    }
    return res.status(404).json({ error: 'NOT_FOUND' })
  }
  return res.status(400).json({ error: true, msg: 'Please provide event id' })
}

module.exports = {
  getEvent, updateEvent, deleteEvent
}