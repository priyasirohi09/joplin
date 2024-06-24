"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locale_1 = require("../../../locale");
const Folder_1 = require("../../../models/Folder");
const Setting_1 = require("../../../models/Setting");
const trash_1 = require("../../../services/trash");
const getEmptyFolderMessage = (folders, selectedFolderId) => {
    if (selectedFolderId === (0, trash_1.getTrashFolderId)()) {
        return (0, locale_1._)('There are no notes in the trash folder.');
    }
    else if (selectedFolderId && (0, trash_1.itemIsInTrash)(Folder_1.default.byId(folders, selectedFolderId))) {
        return (0, locale_1._)('This subfolder of the trash has no notes.');
    }
    if (Setting_1.default.value('appType') === 'desktop') {
        return (0, locale_1._)('No notes in this notebook. Click \'New note\' to start adding your notes.');
    }
    else {
        return (0, locale_1._)('There are currently no notes. Create one by clicking on the (+) button.');
    }
};
exports.default = getEmptyFolderMessage;
//# sourceMappingURL=getEmptyFolderMessage.js.map