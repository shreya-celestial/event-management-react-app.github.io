const uuid = require('uuid');
const moment = require('moment');
const { writeToFile, getAllEvents } = require('./fsUtil')
const { getTextValue } = require('./generalUtil');

const getOrgEvents = (req, res) => {
  const { orgId } = req.params;
  const events = getAllEvents()
  const orgEvents = events.filter((event) => event.organization_id === orgId)
  res.status(200).json({ events: orgEvents })
}

const postNewEvent = (req, res) => {
  const { orgId } = req.params;
  let { event } = req.body
  if (event &&
    event?.name?.html &&
    event?.description?.html &&
    event?.start?.utc && event?.start?.timezone &&
    event?.end?.utc && event?.end?.timezone &&
    event?.capacity
  ) {
    const uuid4 = uuid.v4()
    event = {
      ...event,
      name: {
        text: getTextValue(event?.name?.html),
        html: event?.name?.html
      },
      description: {
        text: getTextValue(event?.description?.html),
        html: event?.description?.html
      },
      start: {
        ...event.start,
        local: moment(moment(event.start.utc).utc().format()).format()
      },
      end: {
        ...event.end,
        local: moment(moment(event.end.utc).utc().format()).format()
      },
      organization_id: orgId,
      id: uuid4
    }
    const events = getAllEvents()
    events.push(event)
    writeToFile(events)
    return res.status(200).json(event)
  }
  return res.status(400).json({ error: true, msg: "Please provide sufficient data!" })
}

module.exports = { getOrgEvents, postNewEvent }