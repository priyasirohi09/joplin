import { Menu, MenuItem } from 'electron';

// Function to prompt rename
const promptRenameNote = (noteId: string) => {
  const newTitle = prompt('Enter new note title:');
  if (newTitle) {
    renameNote(noteId, newTitle);
  }
};

// Function to rename note
const renameNote = (noteId: string, newTitle: string) => {
  // Logic to update the note title in the data store
  // This needs to be implemented according to your backend logic
  console.log(`Renaming note ${noteId} to ${newTitle}`);
};

// Function to handle right-click context menu
const onContextMenu = (noteId: string) => {
  const menu = new Menu();
  menu.append(new MenuItem({
    label: 'Rename Note',
    click: () => {
      promptRenameNote(noteId);
    }
  }));
  menu.popup();
};

export default onContextMenu;
