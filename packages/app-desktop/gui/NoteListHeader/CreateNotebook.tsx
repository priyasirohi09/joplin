import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateNotebook = () => {
    const [name, setName] = useState('');
    const [notebooks, setNotebooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch existing notebooks
        axios.get('/api/notebooks')
            .then(response => setNotebooks(response.data))
            .catch(error => console.error('Error fetching notebooks:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (notebooks.some(notebook => notebook.name === name)) {
            if (!window.confirm('A notebook with this name already exists. Do you want to create it anyway?')) {
                return;
            }
        }

        try {
            await axios.post('/api/create-notebook', { name });
            alert('Notebook created successfully');
            // Update notebooks state or refetch notebooks
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('Notebook with this name already exists.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Create Notebook</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateNotebook;
