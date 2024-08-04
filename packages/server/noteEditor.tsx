import React, { useState } from 'react';

interface NoteEditorProps {
  note: { id: string; title: string; content: string };
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note }) => {
  const [title, setTitle] = useState(note.title);

  const handleRename = () => {
    const newTitle = prompt('Enter new note title:');
    if (newTitle) {
      setTitle(newTitle);
      renameNote(note.id, newTitle);
    }
  };

  const renameNote = (noteId: string, newTitle: string) => {
    // Logic to update the note title in the data store
    // This needs to be implemented according to your backend logic
    console.log(`Renaming note ${noteId} to ${newTitle}`);
  };

  return (
    <div>
      <h1>{title} <button onClick={handleRename}>Rename</button></h1>
      {/* rest of your editor component */}
    </div>
  );
};

export default NoteEditor;
