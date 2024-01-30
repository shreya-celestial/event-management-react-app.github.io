const pool = require('./pool')

const getUserByToken = async (token) => {
  const query = 'SELECT * FROM users WHERE token=$1 LIMIT 1'
  const { rows } = await pool.query(query, [token]);
  return rows[0]
}

const getUserTokenById = async (userId) => {
  const query = 'SELECT token FROM users WHERE id=$1 LIMIT 1'
  const { rows } = await pool.query(query, [userId]);
  return rows[0]?.token
}

const getOrganizationUsingUserId = async (userId) => {
  const query = 'SELECT A.name, A.id, A.created FROM organizations A JOIN users B ON A.id = B.org_id WHERE B.id = $1 LIMIT 1'
  const { rows } = await pool.query(query, [userId])
  return rows[0]
}

module.exports = {
  getUserByToken,
  getUserTokenById,
  getOrganizationUsingUserId
}