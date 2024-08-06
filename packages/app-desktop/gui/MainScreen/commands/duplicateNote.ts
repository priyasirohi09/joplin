import { CommandRuntime, CommandDeclaration, CommandContext } from '@joplin/lib/services/CommandService';
import { _ } from '@joplin/lib/locale';
import Note from '@joplin/lib/models/Note';

interface NoteEntity {
    title?: string;
}

export const declaration: CommandDeclaration = {
    name: 'duplicateNote',
    label: () => _('Duplicate'),
};

export const runtime = (): CommandRuntime => {
    return {
        execute: async (context: CommandContext, noteIds: string[] = null) => {
            if (noteIds === null) noteIds = context.state.selectedNoteIds;

            for (let i = 0; i < noteIds.length; i++) {
                const note = await Note.load(noteIds[i]);
                const baseTitle = note.title;

                let newTitle = baseTitle;
                let number = 1;

                while (true) {
                    const checkTitle = _('%s (%d)', baseTitle, number);
                    const existingNotes = context.state.notes.filter((n: NoteEntity) => n.title === checkTitle);
                    if (existingNotes.length === 0) {
                        newTitle = checkTitle;
                        break;
                    }
                    
                    number++;
                }

                await Note.duplicate(noteIds[i], {
                    uniqueTitle: newTitle,
                });
            }
        },
        enabledCondition: '!noteIsReadOnly',
    };
};
