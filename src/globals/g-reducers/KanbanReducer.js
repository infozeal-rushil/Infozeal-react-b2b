//Action types
export const TOGGLE_DETAILS_OFFCANVAS = 'TOGGLE_DETAILS_OFFCANVAS';
export const TOGGLE_ADD_LIST_MODAL = 'TOGGLE_ADD_LIST_MODAL';
export const REMOVE_ITEM_FROM_LIST = 'REMOVE_ITEM_FROM_LIST';
export const UPDATE_SINGLE_COLUMN = 'UPDATE_SINGLE_COLUMN';
export const UPDATE_DUAL_COLUMN = 'UPDATE_DUAL_COLUMN';
export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
// Reducer function
export const kanbanReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_DETAILS_OFFCANVAS: {
            const { payload } = action;
            return Object.assign(Object.assign({}, state), { openBoardDetailsOffcanvas: payload !== undefined ? payload : !state.openBoardDetailsOffcanvas });
        }
        case TOGGLE_ADD_LIST_MODAL: {
            const { payload } = action;
            return Object.assign(Object.assign({}, state), { openAddListModal: payload !== undefined ? payload : !state.openBoardDetailsOffcanvas });
        }
        case REMOVE_ITEM_FROM_LIST: {
            const { payload } = action;
            return Object.assign(Object.assign({}, state), { boardLists: state.boardLists.map(list => list.id === payload.listId
                    ? Object.assign(Object.assign({}, list), { tasks: list.tasks.filter((task, index) => index !== payload.itemIndex) }) : list) });
        }
        case UPDATE_SINGLE_COLUMN: {
            const { payload: { column, reorderItems } } = action;
            return Object.assign(Object.assign({}, state), { boardLists: state.boardLists.map(list => list.id === column.id ? Object.assign(Object.assign({}, list), { tasks: reorderItems }) : list) });
        }
        case UPDATE_DUAL_COLUMN: {
            const { payload: { sourceColumn, updatedSourceItems, destColumn, updatedDestItems } } = action;
            return Object.assign(Object.assign({}, state), { boardLists: state.boardLists.map(list => {
                    if (list.id === sourceColumn.id) {
                        return Object.assign(Object.assign({}, list), { tasks: updatedSourceItems });
                    }
                    if (list.id === destColumn.id) {
                        return Object.assign(Object.assign({}, list), { tasks: updatedDestItems });
                    }
                    return list;
                }) });
        }
        case ADD_NEW_TASK: {
            const { payload: { newTask, columnId } } = action;
            const updatedList = state.boardLists.map(kanbanItem => kanbanItem.id === columnId
                ? Object.assign(Object.assign({}, kanbanItem), { tasks: [...kanbanItem.tasks, newTask] }) : kanbanItem);
            return Object.assign(Object.assign({}, state), { boardLists: updatedList });
        }
        case ADD_NEW_LIST: {
            const { payload: { list, columnNo } } = action;
            const updatedList = [...state.boardLists];
            updatedList.splice(columnNo - 1, 1, list);
            return Object.assign(Object.assign({}, state), { boardLists: updatedList, openAddListModal: false });
        }
        default:
            return state;
    }
};
