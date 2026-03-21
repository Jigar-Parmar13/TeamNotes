import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { fetchNotes } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await fetchNotes();
      // Sort notes by newest first
      const sortedNotes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotes(sortedNotes);
    } catch (err) {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleNoteCreated = (newNote) => {
    setNotes(prev => [newNote, ...prev]);
  };

  return (
    <div>
      <Header />
      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        <NoteForm onNoteCreated={handleNoteCreated} />
      </main>

      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</p>}

      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--secondary-color)' }}>Loading notes...</p>
      ) : (
        <NoteList notes={notes} />
      )}
    </div>
  );
}

export default App;
