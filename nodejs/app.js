const express = require('express');
const nocache = require('nocache');
const app = express();

app.use(nocache());

const auth = require('./Controllers/auth')
const events = require('./Routes/events')
const users = require('./Routes/users')
const organizations = require('./Routes/organizations')

app.use(express.json());

app.use('/events', [auth, events]);
app.use('/users', users);
app.use('/organizations', [auth, organizations]);
app.all('*', (req, res) => { return res.status(404).json({ error: 'NOT_FOUND' }) })

app.listen(8080, () => {
  console.log('Listening at http://localhost:8080/')
})