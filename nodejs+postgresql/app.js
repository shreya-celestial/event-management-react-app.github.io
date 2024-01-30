const express = require('express');
const nocache = require('nocache');
const app = express();

app.use(nocache());
app.use(express.json());

const events = require('./Routers/events')
const users = require('./Routers/users')
const organizations = require('./Routers/organizations')
const auth = require('./Routers/Controllers/auth')

app.use('/events', [auth, events])
app.use('/users', users)
app.use('/organizations', [auth, organizations])
app.all('*', (req, res) => { return res.status(404).json({ error: 'NOT_FOUND' }) })

app.listen(8080, () => {
  console.log('Listening at http://localhost:8080/')
})