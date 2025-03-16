const FormRepository = require('../repositories/FormRepository');

class FormService {
  constructor() {
    this.formRepository = FormRepository;
  }

  // Get all forms
  async getAllForms() {
    return await this.formRepository.findAll();
  }

  // Get form by ID
  async getFormById(id) {
    return await this.formRepository.findById(id);
  }

  // Check if form name is unique
  async isFormNameUnique(name, excludeId = null) {
    if (excludeId) {
      const form = await this.formRepository.findByNameExcludingId(name, excludeId);
      return !form;
    } else {
      const form = await this.formRepository.findByName(name);
      return !form;
    }
  }

  // Create a new form
  async createForm(formData) {
    const isUnique = await this.isFormNameUnique(formData.name);
    if (!isUnique) {
      const error = new Error('Form name must be unique');
      error.statusCode = 400;
      throw error;
    }
    
    return await this.formRepository.create(formData);
  }

  // Update a form
  async updateForm(id, formData) {
    if (formData.name) {
      const isUnique = await this.isFormNameUnique(formData.name, id);
      if (!isUnique) {
        const error = new Error('Form name must be unique');
        error.statusCode = 400;
        throw error;
      }
    }
    
    const form = await this.formRepository.update(id, formData);
    if (!form) {
      const error = new Error('Form not found');
      error.statusCode = 404;
      throw error;
    }
    
    return form;
  }

  // Delete a form
  async deleteForm(id) {
    const form = await this.formRepository.delete(id);
    if (!form) {
      const error = new Error('Form not found');
      error.statusCode = 404;
      throw error;
    }
    
    return form;
  }
}

module.exports = new FormService(); 