const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

// const Item = require('../models/Item');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', authenticate, async(req, res, next) => {
    console.log(req.body, 'hello world big worlds');
    try {
      const item = await Item.insert(req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });

      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!' });
    } catch (error) {
      next(error);
    }
  });
//   .get('/me', authenticate, (req, res) => {
//     res.json(req.user);
//   })
//   .delete('/sessions', (req, res) => {
//     res
//       .clearCookie(process.env.COOKIE_NAME, {
//         httpOnly: true,
//         secure: process.env.SECURE_COOKIES === 'true',
//         sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
//         maxAge: ONE_DAY_IN_MS,
//       })
//       .status(204)
//       .send();
//   });
