const pool = require('./pool');

const getEventById = async (id) => {
  const query = 'SELECT * FROM events WHERE id=$1 LIMIT 1'
  const { rows } = await pool.query(query, [id]);
  return rows
}

const updateEventById = async (event) => {
  const { name, description: dsc, capacity, id } = event
  const query = 'UPDATE events SET name_text=$1, name_html=$2, dsc_text=$3, dsc_html=$4, capacity=$5 WHERE id=$6 RETURNING *'
  const { rows } = await pool.query(query, [name.text, name.html, dsc.text, dsc.html, capacity, id]);
  return rows
}

const deleteEventById = async (id) => {
  const query = 'DELETE FROM events WHERE id=$1 RETURNING *'
  const { rows } = await pool.query(query, [id]);
  return rows
}

module.exports = {
  getEventById,
  updateEventById,
  deleteEventById
}