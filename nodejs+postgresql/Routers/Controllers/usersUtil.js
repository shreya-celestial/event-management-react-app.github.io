const { getUserByToken, getUserTokenById, getOrganizationUsingUserId } = require('../../repos/userRepo')

const getUserDetails = async (req, res) => {
  const { token } = req.query
  if (token) {
    const tableData = await getUserByToken(token)
    if (tableData) {
      const data = {
        emails: [
          {
            email: tableData.email
          }
        ],
        id: tableData.id,
        name: tableData.name,
        first_name: tableData.first_name,
        last_name: tableData.last_name
      }
      return res.status(200).json(data)
    }
  }
  return res.status(404).json({ error: 'NOT_FOUND' })
}

const getOrgDetails = async (req, res) => {
  const { userId } = req.params;

  if (userId) {
    let { authorization } = req.headers
    if (!authorization) {
      return res.status(400).json({ error: true, msg: 'Please provide authentication token' })
    }
    authorization = authorization.split('Bearer ');
    if (authorization.length > 1) {
      const auth = authorization[1];
      const tableToken = await getUserTokenById(userId);

      if (auth === tableToken) {
        const tableData = await getOrganizationUsingUserId(userId)
        if (tableData) {
          const data = {
            organizations: [
              {
                _type: "organization",
                name: tableData.name,
                created: tableData.created,
                id: tableData.id
              }
            ]
          }
          return res.status(200).json(data)
        }
        return res.status(404).json({ error: 'NOT_FOUND' })
      }
      return res.status(400).json({ error: true, msg: "Please provide a valid token" })
    }
    return res.status(400).json({ error: true, msg: "Please provide a token" })
  }
  return res.status(400).json({ error: true, msg: "Please provide user id" })
}

module.exports = {
  getUserDetails,
  getOrgDetails
}