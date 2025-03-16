const express = require('express');
const router = express.Router();
const FormController = require('../controllers/FormController');

// Get all forms
router.get('/', FormController.getAllForms);

// Get form by ID
router.get('/:id', FormController.getFormById);

// Create form
router.post('/', FormController.createForm);

// Update form
router.put('/:id', FormController.updateForm);

// Delete form
router.delete('/:id', FormController.deleteForm);

module.exports = router; 