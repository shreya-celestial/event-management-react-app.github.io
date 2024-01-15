const { org, token } = require('../Data/data')

const tokenDetails = (req, res) => {
  const { token: queryToken } = req.query
  if (queryToken && queryToken === 'FDIPPMQAAF6HDHUQH73M') {
    return res.status(200).json(token)
  }
  if (!queryToken) {
    return res.status(400).json({ error: true, msg: "Please provide a token" })
  }
  return res.status(404).json({ error: "NOT_FOUND" })
}

const orgDetails = (req, res) => {
  const { userId } = req.params;
  if (userId && userId === '1847396924273') {
    let { authorization } = req.headers
    if (!authorization) {
      return res.status(400).json({ error: true, msg: 'Please provide authentication token' })
    }
    authorization = authorization.split('Bearer ');
    if (authorization.length > 1) {
      const auth = authorization[1];
      if (auth === 'FDIPPMQAAF6HDHUQH73M') {
        return res.status(200).json(org)
      }
      return res.status(400).json({ error: true, msg: "Please provide a valid token" })
    }
    return res.status(400).json({ error: true, msg: "Please provide a token" })
  }
  return res.status(404).json({ error: "NOT_FOUND" })
}

module.exports = {
  tokenDetails, orgDetails
}