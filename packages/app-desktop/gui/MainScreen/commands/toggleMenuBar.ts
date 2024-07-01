import { CommandDeclaration, CommandRuntime } from '@joplin/lib/services/CommandService';
import Setting from '@joplin/lib/models/Setting';
import { _ } from '@joplin/lib/locale';

export const declaration: CommandDeclaration = {
	name: 'toggleMenuBar',
	label: () => _('Toggle menu bar'),
};

export const runtime = (): CommandRuntime => {
	return {
		execute: async () => {
			Setting.toggle('showMenuBar');

			if (!Setting.value('showMenuBar')) {
				if (document.getElementById('text-alert-menu')) {
					document.getElementById('text-alert-menu').style.display = 'block';
				}
			} else {
				if (document.getElementById('text-alert-menu')) {
					document.getElementById('text-alert-menu').style.display = 'none';
				}
			}
		},
	};
};
