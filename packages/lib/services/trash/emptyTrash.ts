import BaseItem from '../../models/BaseItem';
import Folder from '../../models/Folder';
import Note from '../../models/Note';

export default async () => {
	const result = await BaseItem.allItemsInTrash();

	if (!result.noteIds.length && !result.folderIds.length) {
		return false;
	}

	await Note.batchDelete(result.noteIds, { sourceDescription: 'emptyTrash/notes' });

	for (const folderId of result.folderIds) {
		await Folder.delete(folderId, { deleteChildren: false, sourceDescription: 'emptyTrash/folders' });
	}

	return true;
};
