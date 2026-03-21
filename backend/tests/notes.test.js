const request = require('supertest');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const healthRoutes = require('../src/routes/health');
const notesRoutes = require('../src/routes/notes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/health', healthRoutes);
app.use('/api/notes', notesRoutes);

// correct path — goes up from tests/ to backend/ then to data/
const DATA_FILE = path.join(__dirname, '../data/notes.json');

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
    expect(res.body.id).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
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

  test('POST /api/notes without body should return 400', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({});
    expect(res.statusCode).toBe(400);
  });

});

describe('NoteStore model', () => {

  test('getAllNotes should return array even if file is corrupted', () => {
    const noteStore = require('../src/models/noteStore');
    const original = fs.readFileSync(DATA_FILE, 'utf8');
    fs.writeFileSync(DATA_FILE, 'invalid json');
    const notes = noteStore.getAllNotes();
    expect(Array.isArray(notes)).toBe(true);
    fs.writeFileSync(DATA_FILE, original);
  });

  test('addNote should return new note with id and createdAt', () => {
    const noteStore = require('../src/models/noteStore');
    const note = noteStore.addNote({ title: 'Model Test', content: 'Testing model' });
    expect(note.id).toBeDefined();
    expect(note.createdAt).toBeDefined();
    expect(note.title).toBe('Model Test');
  });

});