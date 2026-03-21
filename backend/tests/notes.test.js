const request = require('supertest');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const healthRoutes = require('../src/routes/health');
const notesRoutes = require('../src/routes/notes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/health', healthRoutes);
app.use('/api/notes', notesRoutes);

describe('Health API', () => {

  test('GET /api/health should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/health should return status OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.status).toBe('OK');
  });

});

describe('Notes API', () => {

  test('GET /api/notes should return 200', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/notes should return an array', async () => {
    const res = await request(app).get('/api/notes');
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/notes should create a note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Test Note', content: 'Test Content' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Note');
    expect(res.body.content).toBe('Test Content');
  });

  test('POST /api/notes without title should return 400', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ content: 'No title here' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Title and content are required');
  });

  test('POST /api/notes without content should return 400', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'No content here' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Title and content are required');
  });

});