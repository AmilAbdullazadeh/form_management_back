const request = require('supertest');
const express = require('express');
const Form = require('../../src/models/Form');
const formRoutes = require('../../src/routes/form.routes');

const app = express();
app.use(express.json());
app.use('/api/forms', formRoutes);

describe('Form API Tests', () => {
  let testForm;
  
  beforeEach(async () => {
    testForm = await Form.create({
      name: 'Contact Form',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'email' }
      ]
    });
  });
  
  it('should get all forms', async () => {
    const res = await request(app)
      .get('/api/forms')
      .expect(200);
    
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Contact Form');
  });
  
  it('should get a form by id', async () => {
    const res = await request(app)
      .get(`/api/forms/${testForm._id}`)
      .expect(200);
    
    expect(res.body.name).toBe('Contact Form');
  });
  
  it('should create a new form', async () => {
    const newForm = {
      name: 'Feedback Form',
      fields: [{ name: 'rating', type: 'number' }]
    };
    
    const res = await request(app)
      .post('/api/forms')
      .send(newForm)
      .expect(201);
    
    expect(res.body.name).toBe('Feedback Form');
  });
  
  it('should update a form', async () => {
    const res = await request(app)
      .put(`/api/forms/${testForm._id}`)
      .send({ name: 'Updated Form' })
      .expect(200);
    
    expect(res.body.name).toBe('Updated Form');
  });
  
  it('should delete a form', async () => {
    await request(app)
      .delete(`/api/forms/${testForm._id}`)
      .expect(200);
    
    const deleted = await Form.findById(testForm._id);
    expect(deleted).toBeNull();
  });
}); 