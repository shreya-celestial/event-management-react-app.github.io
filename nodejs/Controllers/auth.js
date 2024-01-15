const auth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(400).json({ error: true, msg: 'Please provide authentication token' })
  }
  next()
}

module.exports = auth;