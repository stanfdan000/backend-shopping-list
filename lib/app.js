const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const authenticate = require('./middleware/authenticate');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://alchemy-shopping-front-end-demo.netlify.app',
    'http://localhost:7890',

  ],
  credentials: true,
})
);
app.use(cookieParser());

// App routes

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/items', require('./controllers/items'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
