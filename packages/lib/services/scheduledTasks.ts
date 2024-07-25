import * as cron from 'node-cron';
import Note from '../models/Note';

export function startScheduledTasks() {
	// Run every day at midnight
	cron.schedule('0 0 * * *', async () => {
		console.log('Running scheduled task: Delete old trashed notes');
		await Note.deleteOldTrashedNotes();
	});
}
