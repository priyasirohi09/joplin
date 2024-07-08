"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtime = exports.declaration = void 0;
const locale_1 = require("@joplin/lib/locale");
const reducer_1 = require("@joplin/lib/reducer");
exports.declaration = {
    name: 'focusElementNoteList',
    label: () => (0, locale_1._)('Note list'),
    parentLabel: () => (0, locale_1._)('Focus'),
};
const runtime = (focusNote) => {
    return {
        execute: (context, noteId = null) => __awaiter(void 0, void 0, void 0, function* () {
            noteId = noteId || reducer_1.stateUtils.selectedNoteId(context.state);
            focusNote(noteId);
        }),
        enabledCondition: 'noteListHasNotes',
    };
};
exports.runtime = runtime;
//# sourceMappingURL=focusElementNoteList.js.map

//added comment to test git