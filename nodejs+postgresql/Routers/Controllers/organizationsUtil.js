const { getAllOrgEvents, insertNewEvent } = require('../../repos/orgEventsRepo')
const { convertRowsToEvents, convertBodyToEvent } = require('./globalUtils')

const getOrgEvents = async (req, res) => {
  const { orgId } = req.params
  if (orgId) {
    const tableData = await getAllOrgEvents(orgId);
    if (tableData) {
      const events = convertRowsToEvents(tableData)
      return res.status(200).json({ events })
    }
  }
}

const postNewEvent = async (req, res) => {
  const { orgId } = req.params;
  let { event } = req.body
  if (event &&
    event?.name?.html &&
    event?.description?.html &&
    event?.start?.utc &&
    event?.end?.utc &&
    event?.capacity
  ) {
    event = convertBodyToEvent(orgId, event)
    const tableData = await insertNewEvent(event)
    if (tableData) {
      const data = {
        ...event,
        id: tableData.id
      }
      return res.status(200).json(data)
    }
  }
}

module.exports = { getOrgEvents, postNewEvent }