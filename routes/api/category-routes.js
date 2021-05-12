const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  })
  .then(data => res.json(data))
  .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
    
  })
  .then(data => res.json(data))
  .catch(err => res.status(400).json(err))
});


router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(dbPost => {
    res.json(dbPost);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbPut => {
    res.json(dbPut);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbDestroy => {
    res.json(dbDestroy);
  });
});

module.exports = router;
