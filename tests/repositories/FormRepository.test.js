const mongoose = require('mongoose');
const FormRepository = require('../../src/repositories/FormRepository');
const Form = require('../../src/models/Form');

describe('Form Repository Tests', () => {
  let testForm;
  let savedForm;

  beforeEach(async () => {
    testForm = {
      name: 'Contact Form',
      isVisible: true,
      isReadOnly: false,
      fields: [
        { name: 'name', type: 'text', isRequired: true },
        { name: 'email', type: 'email', isRequired: false }
      ]
    };
    
    const form = new Form(testForm);
    savedForm = await form.save();
  });

  it('should find all forms', async () => {
    const forms = await FormRepository.findAll();
    
    expect(forms.length).toBeGreaterThan(0);
    expect(forms[0].name).toBe(testForm.name);
  });

  it('should find a form by id', async () => {
    const form = await FormRepository.findById(savedForm._id);
    
    expect(form).not.toBeNull();
    expect(form.name).toBe(testForm.name);
  });

  it('should create a new form', async () => {
    const newForm = {
      name: 'Feedback Form',
      isVisible: true,
      isReadOnly: false,
      fields: [
        { name: 'rating', type: 'number', isRequired: false }
      ]
    };
    
    const created = await FormRepository.create(newForm);
    
    expect(created._id).toBeDefined();
    expect(created.name).toBe(newForm.name);
  });

  it('should update a form', async () => {
    const updated = await FormRepository.update(savedForm._id, { 
        name: 'Updated Form',
        isVisible: true,
        isReadOnly: false,
        fields: [{ name: 'email', type: 'email', isRequired: true }]
    });
    
    expect(updated.name).toBe('Updated Form');
  });

  it('should delete a form', async () => {
    await FormRepository.delete(savedForm._id);
    
    const found = await Form.findById(savedForm._id);
    expect(found).toBeNull();
  });
}); 