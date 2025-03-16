const FormService = require('../services/FormService');

class FormController {
  constructor() {
    this.formService = FormService;
  }

   // Get all forms
  async getAllForms(req, res) {
    try {
      const forms = await this.formService.getAllForms();
      res.json(forms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Get form by ID
  async getFormById(req, res) {
    try {
      const form = await this.formService.getFormById(req.params.id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.json(form);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Create a new form
  async createForm(req, res) {
    try {
      const newForm = await this.formService.createForm(req.body);
      res.status(201).json(newForm);
    } catch (err) {
      const statusCode = err.statusCode || 400;
      res.status(statusCode).json({ message: err.message });
    }
  }

  // Update a form
  async updateForm(req, res) {
    try {
      const form = await this.formService.updateForm(req.params.id, req.body);
      res.json(form);
    } catch (err) {
      const statusCode = err.statusCode || 400;
      res.status(statusCode).json({ message: err.message });
    }
  }

  // Delete a form
  async deleteForm(req, res) {
    try {
      await this.formService.deleteForm(req.params.id);
      res.json({ message: 'Form deleted' });
    } catch (err) {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).json({ message: err.message });
    }
  }
}

const formController = new FormController();

module.exports = {
  getAllForms: formController.getAllForms.bind(formController),
  getFormById: formController.getFormById.bind(formController),
  createForm: formController.createForm.bind(formController),
  updateForm: formController.updateForm.bind(formController),
  deleteForm: formController.deleteForm.bind(formController)
}; 