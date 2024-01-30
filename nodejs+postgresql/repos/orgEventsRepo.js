const pool = require('./pool')

const getAllOrgEvents = async (orgId) => {
  const query = 'SELECT * FROM events WHERE org_id=$1 ORDER BY id ASC'
  const { rows } = await pool.query(query, [orgId]);
  return rows
}

const insertNewEvent = async (event) => {
  const { name, description: dsc, start, end, capacity, organization_id: orgId } = event
  const query = "INSERT INTO events (name_text, name_html, dsc_text, dsc_html, capacity, org_id, start_utc, end_utc) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;"
  const { rows } = await pool.query(query, [name.text, name.html, dsc.text, dsc.html, capacity, orgId, start.utc, end.utc]);
  return rows[0];
}

module.exports = {
  getAllOrgEvents,
  insertNewEvent
}