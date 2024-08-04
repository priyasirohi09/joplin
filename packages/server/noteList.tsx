import React, { useState } from 'react';

interface NoteListProps {
  notes: Array<{ id: string; title: string }>;
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const [noteList, setNoteList] = useState(notes);

  const renameNoteInList = (noteId: string, newTitle: string) => {
    const updatedNotes = noteList.map(note =>
      note.id === noteId ? { ...note, title: newTitle } : note
    );
    setNoteList(updatedNotes);
  };

  return (
    <ul>
      {noteList.map(note => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
};

export default NoteList;
