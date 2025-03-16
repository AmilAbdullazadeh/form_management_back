const Form = require('../models/Form');

class FormRepository {
  // Find all forms
  async findAll() {
    return await Form.find();
  }

  // Find form by ID
  async findById(id) {
    return await Form.findById(id);
  }

  // Find form by name
  async findByName(name) {
    return await Form.findOne({ name });
  }

  // Find form by name excluding a specific ID
  async findByNameExcludingId(name, excludeId) {
    return await Form.findOne({ name, _id: { $ne: excludeId } });
  }

  // Create a new form
  async create(formData) {
    const form = new Form(formData);
    return await form.save();
  }

  // Update a form
  async update(id, formData) {
    return await Form.findByIdAndUpdate(id, formData, { new: true });
  }

  // Delete a form
  async delete(id) {
    return await Form.findByIdAndDelete(id);
  }
}

module.exports = new FormRepository(); 