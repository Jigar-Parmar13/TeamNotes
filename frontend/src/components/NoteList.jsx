import React from 'react';

const NoteList = ({ notes }) => {
    if (notes.length === 0) {
        return (
            <div className="empty-state">
                <p>No notes yet. Create one above!</p>
            </div>
        );
    }

    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <div key={note.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{note.title}</h3>
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--text-color)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {note.content}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--secondary-color)' }}>
                        {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
