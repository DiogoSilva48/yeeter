const express = require('express');
const router = express.Router();
const yeetController = require('../controllers/yeetController');

// Route to create a new yeet
router.post('/', yeetController.createYeet);

// Route to get a single yeet by ID
router.get('/:id', yeetController.getYeetById);

// Route to update a yeet by ID
router.put('/:id', yeetController.updateYeet);

// Route to delete a yeet by ID
router.delete('/:id', yeetController.deleteYeet);

module.exports = router;
