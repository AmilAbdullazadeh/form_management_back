const mongoose = require('mongoose');
const Form = require('../../src/models/Form');

describe('Form Model Tests', () => {
  it('should create a valid form', async () => {
    const form = new Form({
      name: 'Contact Form',
      isVisible: true,
      isReadOnly: false,
      fields: [
        { name: 'name', type: 'text', isRequired: true },
        { name: 'email', type: 'email', isRequired: false }
      ]
    });
    
    const savedForm = await form.save();
    
    expect(savedForm._id).toBeDefined();
    expect(savedForm.name).toBe('Contact Form');
    expect(savedForm.fields.length).toBe(2);
  });
  
  it('should fail when name is missing', async () => {
    const form = new Form({
      fields: [{ name: 'field1' }]
    });
    
    let error;
    try {
      await form.save();
    } catch (err) {
      error = err;
    }
    
    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
  });
  
  it('should set default values', async () => {
    const form = new Form({
      name: 'Default Test',
      isVisible: true,
      isReadOnly: false,
      fields: [
        { name: 'name', type: 'text', isRequired: false },
        { name: 'email', type: 'email', isRequired: false }
      ]
    });
    
    const savedForm = await form.save();
    
    expect(savedForm.isVisible).toBe(true);
    expect(savedForm.isReadOnly).toBe(false);
    expect(savedForm.fields[0].type).toBe('text');
  });
  
  it('should not allow duplicate form names', async () => {
    // Create first form
    await new Form({
      name: 'Duplicate Test',
      isVisible: true,
      isReadOnly: false,
      fields: []
    }).save();
    
    // Try to create another with same name
    const duplicateForm = new Form({
      name: 'Duplicate Test',
      isVisible: true,
      isReadOnly: false,
      fields: []
    });
    
    let error;
    try {
      await duplicateForm.save();
    } catch (err) {
      error = err;
    }
    
    expect(error).toBeDefined();
    expect(error.code).toBe(11000);
  });
}); 