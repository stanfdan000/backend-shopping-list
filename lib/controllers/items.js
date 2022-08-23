const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');
const authorize = require('../middleware/authorize');

// const Item = require('../models/Item');
// const UserService = require('../services/UserService');



module.exports = Router()
  .post('/', authenticate, async(req, res, next) => {
    try {
      const item = await Item.insert(req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);

      res.json(items);
    } catch (error) {
      next(error);
    }
  })
  .get('/me', authenticate, (req, res) => {
    res.json(req.item);
  })

  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.user.id, req.body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authorize, async (req, res, next) => {
    
    try {
      const item = await Item.delete(req.params.id);
      res.json(item);
    } catch (e) {
      next(e);
    }

  });
