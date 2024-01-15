const { readFileSync } = require('fs');
const fs = require('fs').promises;
const path = require('path')

const filePath = path.resolve(__dirname, '../Data/eventsData.txt')

let events = readFileSync(filePath, 'utf8');
events = (JSON.parse(events).events)

const getAllEvents = () => {
  return events
}

const writeToFile = async (value) => {
  const eventsData = value
  value = JSON.stringify({ events: value })
  try {
    const write = await fs.writeFile(filePath, value);
    events = eventsData;
    return
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = {
  events,
  writeToFile,
  getAllEvents
}