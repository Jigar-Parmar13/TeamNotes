const noteStore = require('../models/noteStore');

const getNotes = (req, res) => {
    try {
        const notes = noteStore.getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve notes' });
    }
};

const createNote = (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const newNote = noteStore.addNote({ title, content });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
};

module.exports = {
    getNotes,
    createNote
};
