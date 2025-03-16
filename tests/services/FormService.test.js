const FormService = require('../../src/services/FormService');
const FormRepository = require('../../src/repositories/FormRepository');

// Mock the repository
jest.mock('../../src/repositories/FormRepository');

describe('Form Service Tests', () => {
  const testForm = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Contact Form',
    isVisible: true,
    isReadOnly: false,
    fields: [{ name: 'email', type: 'email', isRequired: false }]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all forms', async () => {
    FormRepository.findAll.mockResolvedValue([testForm]);
    
    const forms = await FormService.getAllForms();
    
    expect(forms).toEqual([testForm]);
  });

  it('should get a form by id', async () => {
    FormRepository.findById.mockResolvedValue(testForm);
    
    const form = await FormService.getFormById(testForm._id);
    
    expect(form).toEqual(testForm);
  });

  it('should create a form with unique name', async () => {
    const newForm = { name: 'Feedback Form', isVisible: true, isReadOnly: false, fields: [] };
    FormRepository.findByName.mockResolvedValue(null);
    FormRepository.create.mockResolvedValue({ ...newForm, _id: 'new123' });
    
    const created = await FormService.createForm(newForm);
    
    expect(created.name).toBe(newForm.name);
  });

  it('should throw error when creating form with duplicate name', async () => {
    const newForm = { name: 'Contact Form', isVisible: true, isReadOnly: false, fields: [] };
    FormRepository.findByName.mockResolvedValue(testForm);
    
    await expect(FormService.createForm(newForm)).rejects.toThrow('Form name must be unique');
  });

  it('should update a form', async () => {
    const updates = { name: 'Updated Form', isVisible: true, isReadOnly: false, fields: [{ name: 'email', type: 'email', isRequired: true }] };
    FormRepository.update.mockResolvedValue({ ...testForm, ...updates });
    
    const updated = await FormService.updateForm(testForm._id, updates);
    
    expect(updated.name).toBe('Updated Form');
  });

  it('should delete a form', async () => {
    FormRepository.delete.mockResolvedValue(testForm);
    
    await FormService.deleteForm(testForm._id);
    
    expect(FormRepository.delete).toHaveBeenCalledWith(testForm._id);
  });
}); 