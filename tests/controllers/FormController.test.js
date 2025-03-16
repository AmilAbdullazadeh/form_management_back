const FormController = require('../../src/controllers/FormController');
const FormService = require('../../src/services/FormService');

// Mock the service
jest.mock('../../src/services/FormService');

describe('Form Controller Tests', () => {
  let req, res;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      params: {},
      body: {}
    };
    
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  });

  it('should get all forms', async () => {
    const forms = [
        {
            _id: '123',
            name: 'Contact Form',
            isVisible: true,
            isReadOnly: false,
            fields: [{ name: 'email', type: 'email', isRequired: true }]
        },
        {
            _id: '456',
            name: 'Feedback Form',
            isVisible: true,
            isReadOnly: false,
            fields: [{ name: 'rating', type: 'number', isRequired: false }]
        }
    ];
    FormService.getAllForms.mockResolvedValue(forms);
    
    await FormController.getAllForms(req, res);
    
    expect(res.json).toHaveBeenCalledWith(forms);
  });

  it('should get form by id', async () => {
    const form = { 
        _id: '123',
        name: 'Contact Form',
        isVisible: true,
        isReadOnly: false,
        fields: [{ name: 'email', type: 'email', isRequired: true }]
     };
    req.params.id = '123';
    FormService.getFormById.mockResolvedValue(form);
    
    await FormController.getFormById(req, res);
    
    expect(res.json).toHaveBeenCalledWith(form);
  });

  it('should return 404 when form not found', async () => {
    req.params.id = '123';
    FormService.getFormById.mockResolvedValue(null);
    
    await FormController.getFormById(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should create a new form', async () => {
    const newForm = { 
        name: 'Contact Form',
        isVisible: true,
        isReadOnly: false,
        fields: [{ name: 'email', type: 'email', isRequired: true }]
    };
    const createdForm = { _id: '123', ...newForm };
    req.body = newForm;
    FormService.createForm.mockResolvedValue(createdForm);
    
    await FormController.createForm(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdForm);
  });

  it('should update a form', async () => {
    const form = { 
        _id: '123',
        name: 'Updated Form',
        isVisible: true,
        isReadOnly: false,
        fields: [{ name: 'email', type: 'email', isRequired: true }]
    };
    req.params.id = '123';
    req.body = { 
        name: 'Updated Form',
        isVisible: true,
        isReadOnly: false,
        fields: [{ name: 'email', type: 'email', isRequired: true }]
    };
    FormService.updateForm.mockResolvedValue(form);
    
    await FormController.updateForm(req, res);
    
    expect(res.json).toHaveBeenCalledWith(form);
  });

  it('should delete a form', async () => {
    req.params.id = '123';
    FormService.deleteForm.mockResolvedValue({ _id: '123' });
    
    await FormController.deleteForm(req, res);
    
    expect(res.json).toHaveBeenCalledWith({ message: 'Form deleted' });
  });
}); 