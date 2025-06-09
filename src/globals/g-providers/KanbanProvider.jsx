import { kanbanItems } from 'data/kanban';
import React, { createContext, useContext, useReducer } from 'react';
import { kanbanReducer } from 'reducers/KanbanReducer';
export const KanbanContext = createContext({});
const useKanbanReducer = () => {
    const initState = {
        openBoardDetailsOffcanvas: false,
        openAddListModal: false,
        boardLists: kanbanItems
    };
    return useReducer(kanbanReducer, initState);
};
const KanbanProvider = ({ children }) => {
    const [kanbanState, kanbanDispatch] = useKanbanReducer();
    return (<KanbanContext.Provider value={Object.assign(Object.assign({}, kanbanState), { kanbanDispatch })}>
      {children}
    </KanbanContext.Provider>);
};
export const useKanbanContext = () => useContext(KanbanContext);
export default KanbanProvider;
