"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const SearchBar_1 = require("../SearchBar/SearchBar");
const Button_1 = require("../Button/Button");
const CommandService_1 = require("@joplin/lib/services/CommandService");
const focusSearch_1 = require("./commands/focusSearch");
const Note_1 = require("@joplin/lib/models/Note");
const notesSortOrderUtils_1 = require("../../services/sortOrder/notesSortOrderUtils");
const locale_1 = require("@joplin/lib/locale");
const { connect } = require('react-redux');
const styled_components_1 = require("styled-components");
const stateToWhenClauseContext_1 = require("../../services/commands/stateToWhenClauseContext");
const trash_1 = require("@joplin/lib/services/trash");
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied;
const StyledRoot = styled_components_1.default.div `
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding: ${(props) => props.padding}px;
	background-color: ${(props) => props.theme.backgroundColor3};
	gap: ${(props) => props.buttonVerticalGap}px;
`;
const StyledButton = (0, styled_components_1.default)(Button_1.default) `
	width: auto;
	height: 26px;
	min-height: 26px;
	min-width: 37px;
	max-width: none;
	white-space: nowrap;

  .fa, .fas {
    font-size: 11px;
  }
`;
const StyledPairButtonL = (0, styled_components_1.default)(Button_1.default) `
	border-radius: 3px 0 0 3px;
	min-width: ${(props) => (0, Button_1.buttonSizePx)(props)}px;
	max-width: ${(props) => (0, Button_1.buttonSizePx)(props)}px;
`;
const StyledPairButtonR = (0, styled_components_1.default)(Button_1.default) `
	min-width: 8px;
	border-radius: 0 3px 3px 0;
	border-width: 1px 1px 1px 0;
	width: auto;
`;
const TopRow = styled_components_1.default.div `
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
`;
const BottomRow = styled_components_1.default.div `
	display: flex;
	flex-direction: row;
	flex: 1 1 auto;
	gap: 8px;
`;
const SortOrderButtonsContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;
function NoteListControls(props) {
    const searchBarRef = (0, react_1.useRef)(null);
    const newTodoButtonRef = (0, react_1.useRef)(null);
    const noteControlsRef = (0, react_1.useRef)(null);
    const searchAndSortRef = (0, react_1.useRef)(null);
    const breakpoint = props.breakpoint;
    const dynamicBreakpoints = props.dynamicBreakpoints;
    const lineCount = props.lineCount;
    const noteButtonText = (0, react_1.useMemo)(() => {
        if (breakpoint === dynamicBreakpoints.Sm) {
            return '';
        }
        else if (breakpoint === dynamicBreakpoints.Md) {
            return (0, locale_1._)('note');
        }
        else {
            return (0, locale_1._)('New note');
        }
    }, [breakpoint, dynamicBreakpoints]);
    const todoButtonText = (0, react_1.useMemo)(() => {
        if (breakpoint === dynamicBreakpoints.Sm) {
            return '';
        }
        else if (breakpoint === dynamicBreakpoints.Md) {
            return (0, locale_1._)('to-do');
        }
        else {
            return (0, locale_1._)('New to-do');
        }
    }, [breakpoint, dynamicBreakpoints]);
    const noteIcon = (0, react_1.useMemo)(() => {
        if (breakpoint === dynamicBreakpoints.Sm) {
            return 'icon-note';
        }
        else {
            return 'fas fa-pencil-alt';
        }
    }, [breakpoint, dynamicBreakpoints]);
    const todoIcon = (0, react_1.useMemo)(() => {
        if (breakpoint === dynamicBreakpoints.Sm) {
            return 'far fa-check-square';
        }
        else {
            return 'fas fa-pencil-alt';
        }
    }, [breakpoint, dynamicBreakpoints]);
    const showTooltip = (0, react_1.useMemo)(() => {
        if (breakpoint === dynamicBreakpoints.Sm) {
            return true;
        }
        else {
            return false;
        }
    }, [breakpoint, dynamicBreakpoints.Sm]);
    (0, react_1.useEffect)(() => {
        if (lineCount === 1) {
            noteControlsRef.current.style.flexDirection = 'row';
            searchAndSortRef.current.style.flex = '2 1 50%';
        }
        else {
            noteControlsRef.current.style.flexDirection = 'column';
        }
    }, [lineCount]);
    (0, react_1.useEffect)(() => {
        CommandService_1.default.instance().registerRuntime('focusSearch', (0, focusSearch_1.runtime)(searchBarRef));
        return function () {
            CommandService_1.default.instance().unregisterRuntime('focusSearch');
        };
    }, []);
    function onNewTodoButtonClick() {
        void CommandService_1.default.instance().execute('newTodo');
    }
    function onNewNoteButtonClick() {
        void CommandService_1.default.instance().execute('newNote');
    }
    function onSortOrderFieldButtonClick() {
        void CommandService_1.default.instance().execute('toggleNotesSortOrderField');
    }
    function onSortOrderReverseButtonClick() {
        void CommandService_1.default.instance().execute('toggleNotesSortOrderReverse');
    }
    function sortOrderFieldTooltip() {
        const term1 = CommandService_1.default.instance().label('toggleNotesSortOrderField');
        const field = props.sortOrderField;
        const term2 = Note_1.default.fieldToLabel(field);
        const term3 = Note_1.default.fieldToLabel((0, notesSortOrderUtils_1.notesSortOrderNextField)(field));
        return `${term1}:\n ${term2} -> ${term3}`;
    }
    function sortOrderFieldIcon() {
        const defaultIcon = 'fas fa-cog';
        const field = props.sortOrderField;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
        const iconMap = {
            user_updated_time: 'far fa-calendar-alt',
            user_created_time: 'far fa-calendar-plus',
            title: 'fas fa-font',
            order: 'fas fa-wrench',
            todo_due: 'fas fa-calendar-check',
            todo_completed: 'fas fa-check',
        };
        return `${iconMap[field] || defaultIcon} ${field}`;
    }
    function sortOrderReverseIcon() {
        return props.sortOrderReverse ? 'fas fa-long-arrow-alt-up' : 'fas fa-long-arrow-alt-down';
    }
    function showsSortOrderButtons() {
        let visible = props.sortOrderButtonsVisible;
        if (props.notesParentType === 'Search')
            visible = false;
        return visible;
    }
    function renderNewNoteButtons() {
        if (!props.showNewNoteButtons)
            return null;
        return (React.createElement(TopRow, { className: "new-note-todo-buttons" },
            React.createElement(StyledButton, { ref: (el) => {
                    props.setNewNoteButtonElement(el);
                }, className: "new-note-button", tooltip: showTooltip ? CommandService_1.default.instance().label('newNote') : '', iconName: noteIcon, title: (0, locale_1._)('%s', noteButtonText), level: Button_1.ButtonLevel.Primary, size: props.buttonSize, onClick: onNewNoteButtonClick, disabled: !props.newNoteButtonEnabled }),
            React.createElement(StyledButton, { ref: newTodoButtonRef, className: "new-todo-button", tooltip: showTooltip ? CommandService_1.default.instance().label('newTodo') : '', iconName: todoIcon, title: (0, locale_1._)('%s', todoButtonText), level: Button_1.ButtonLevel.Secondary, size: props.buttonSize, onClick: onNewTodoButtonClick, disabled: !props.newTodoButtonEnabled })));
    }
    return (React.createElement(StyledRoot, { ref: noteControlsRef, padding: props.padding, buttonVerticalGap: props.buttonVerticalGap },
        renderNewNoteButtons(),
        React.createElement(BottomRow, { ref: searchAndSortRef, className: "search-and-sort" },
            React.createElement(SearchBar_1.default, { inputRef: searchBarRef }),
            showsSortOrderButtons() &&
                React.createElement(SortOrderButtonsContainer, null,
                    React.createElement(StyledPairButtonL, { className: "sort-order-field-button", tooltip: sortOrderFieldTooltip(), iconName: sortOrderFieldIcon(), level: Button_1.ButtonLevel.Secondary, size: props.buttonSize, onClick: onSortOrderFieldButtonClick }),
                    React.createElement(StyledPairButtonR, { className: "sort-order-reverse-button", tooltip: CommandService_1.default.instance().label('toggleNotesSortOrderReverse'), iconName: sortOrderReverseIcon(), level: Button_1.ButtonLevel.Secondary, size: props.buttonSize, onClick: onSortOrderReverseButtonClick })))));
}
const mapStateToProps = (state) => {
    const whenClauseContext = (0, stateToWhenClauseContext_1.default)(state);
    return {
        showNewNoteButtons: state.selectedFolderId !== (0, trash_1.getTrashFolderId)(),
        newNoteButtonEnabled: CommandService_1.default.instance().isEnabled('newNote', whenClauseContext),
        newTodoButtonEnabled: CommandService_1.default.instance().isEnabled('newTodo', whenClauseContext),
        sortOrderButtonsVisible: state.settings['notes.sortOrder.buttonsVisible'],
        sortOrderField: state.settings['notes.sortOrder.field'],
        sortOrderReverse: state.settings['notes.sortOrder.reverse'],
        notesParentType: state.notesParentType,
    };
};
exports.default = connect(mapStateToProps)(NoteListControls);
//# sourceMappingURL=NoteListControls.js.map