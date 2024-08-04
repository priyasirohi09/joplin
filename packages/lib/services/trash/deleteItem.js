import Note from '../../models/Note';
import Folder from '../../models/Folder';
import { ModelType } from '../../BaseModel';

const deleteItem = async (itemType, itemId) => {
	if (itemType === ModelType.Note) {
		await Note.batchDelete([itemId], { sourceDescription: 'deleteItem/notes' });
	} else if (itemType === ModelType.Folder) {
		const folderNoteIds = await Folder.noteIds(itemId, { includeDeleted: true });
		if (folderNoteIds.length === 0) {
			await Folder.delete(itemId, { deleteChildren: false, sourceDescription: 'deleteItem/folders' });
		} else {
			throw new Error('Cannot delete a non-empty folder.');
		}
	}
};

export default deleteItem;
