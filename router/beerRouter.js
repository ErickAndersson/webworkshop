var express = require('express');
var router = express.Router();
var ctrlBeer = require('../controller/beerController.js')

// get
router.get('/',ctrlBeer.getAll);
router.get('/:name',ctrlBeer.getByName);
router.get('/style/:style',ctrlBeer.getByStyle);

// post
router.post('/', ctrlBeer.createBeer);

// update
router.put('/:name', ctrlBeer.updateBeer);

// delete
router.delete('/:name',ctrlBeer.deleteBeer);

module.exports = router;