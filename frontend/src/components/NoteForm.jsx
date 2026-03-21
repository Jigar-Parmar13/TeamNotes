import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { createNote } from '../services/api';

const NoteForm = ({ onNoteCreated }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);
        setError('');

        try {
            const newNote = await createNote({ title, content });
            onNoteCreated(newNote);
            setTitle('');
            setContent('');
            setIsExpanded(false);
        } catch (err) {
            setError('Failed to create note. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isExpanded) {
        return (
            <button
                className="card"
                style={{ width: '100%', textAlign: 'left', cursor: 'text', borderStyle: 'solid', display: 'flex', alignItems: 'center', color: 'var(--secondary-color)' }}
                onClick={() => setIsExpanded(true)}
            >
                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                Take a note...
            </button>
        );
    }

    return (
        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
            <button
                onClick={() => setIsExpanded(false)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary-color)' }}
            >
                <X size={20} />
            </button>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    style={{ fontWeight: 600, fontSize: '1.1rem', border: 'none', padding: '0.5rem 0' }}
                    autoFocus
                />
                <textarea
                    placeholder="Take a note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input"
                    style={{ border: 'none', padding: '0.5rem 0', minHeight: '100px', resize: 'none' }}
                />

                {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Note'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
