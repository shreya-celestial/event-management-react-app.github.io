const { writeToFile } = require('./fsUtil')
const { getTextValue } = require('./generalUtil');
let { events } = require('./fsUtil')

const getEvent = (req, res) => {
  const { id } = req.params
  const event = events.find((event) => event.id === id)
  if (!event) {
    return res.status(404).json({ error: 'NOT_FOUND' })
  }
  res.status(200).json(event)
}

const updateEvent = (req, res) => {
  const { id } = req.params
  const event = events.find((event) => event.id === id)
  if (!event) {
    return res.status(404).json({ error: 'NOT_FOUND' })
  }
  const { event: bodyEvent } = req.body
  if (bodyEvent &&
    bodyEvent?.name?.html &&
    bodyEvent?.description?.html &&
    bodyEvent?.capacity
  ) {
    const updatedEvent = {
      ...event,
      name: {
        text: getTextValue(bodyEvent?.name?.html),
        html: bodyEvent?.name?.html
      },
      description: {
        text: getTextValue(bodyEvent?.description?.html),
        html: bodyEvent?.description?.html
      },
      capacity: bodyEvent?.capacity,
    }
    events = events.map((event) => {
      if (event.id === id) {
        event = updatedEvent
      }
      return event
    })
    writeToFile(events)
    return res.status(202).json(updatedEvent)
  }
  return res.status(400).json({ error: true, msg: "Please provide sufficient data!" })
}

const deleteEvent = (req, res) => {
  const { id } = req.params
  const event = events.find((event) => event.id === id)
  if (!event) {
    return res.status(404).json({ error: 'NOT_FOUND' })
  }
  events = events.filter((event) => event.id !== id)
  writeToFile(events)
  res.status(200).json({ success: true, msg: 'Deleted successfully!' })
}


module.exports = {
  getEvent,
  updateEvent,
  deleteEvent
}
