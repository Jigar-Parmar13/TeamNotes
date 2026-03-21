import React from 'react';
import { NotebookPen } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.5rem 0',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-color)'
        }}>
            <NotebookPen color="var(--primary-color)" size={32} />
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>TeamNotes</h1>
        </header>
    );
};

export default Header;
