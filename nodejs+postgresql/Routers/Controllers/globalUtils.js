const moment = require('moment')

const getTextValue = (value) => {
  let text = value.split('>')
  if (text.length > 1) {
    text = text[1]
    text = text.split('<')[0]
    text = text.trim()
    return text;
  }
  else
    return text[0]
}

const convertRowsToEvents = (rows) => {
  const events = rows.map((rowData) => {
    const event = {
      name: {
        text: rowData.name_text,
        html: rowData.name_html
      },
      description: {
        text: rowData.dsc_text,
        html: rowData.dsc_html
      },
      start: {
        timezone: "UTC",
        local: moment(moment(rowData.start_utc).utc().format()).format(),
        utc: rowData.start_utc
      },
      end: {
        timezone: "UTC",
        local: moment(moment(rowData.end_utc).utc().format()).format(),
        utc: rowData.end_utc
      },
      organization_id: rowData.org_id,
      capacity: rowData.capacity,
      id: rowData.id
    }
    return event
  })
  return events
}

const convertBodyToEvent = (orgId, event) => {
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
  }
  return event
}

const convertBodyForUpdate = (id, event) => {
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
    id
  }
  return event
}

module.exports = { convertRowsToEvents, convertBodyToEvent, convertBodyForUpdate }