const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'notes.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const getAllNotes = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading notes:', err);
        return [];
    }
};

const addNote = (note) => {
    const notes = getAllNotes();
    const newNote = { ...note, id: Date.now().toString(), createdAt: new Date().toISOString() };
    notes.push(newNote);
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
        return newNote;
    } catch (err) {
        console.error('Error writing note:', err);
        throw err;
    }
};

module.exports = {
    getAllNotes,
    addNote
};
