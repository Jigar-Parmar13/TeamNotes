const API_URL = 'http://localhost:3000/api';

export const fetchNotes = async () => {
    try {
        const response = await fetch(`${API_URL}/notes`);
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};

export const createNote = async (note) => {
    try {
        const response = await fetch(`${API_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        if (!response.ok) {
            throw new Error('Failed to create note');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};
