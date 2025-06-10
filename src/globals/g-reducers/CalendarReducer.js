//Action types
export const SET_CALENDAR_STATE = 'SET_CALENDAR_STATE';
export const INITIALIZE_CALENDAR = 'INITIALIZE_CALENDAR';
export const HANDLE_SELECT = 'HANDLE_SELECT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const ADD_NEW_EVENT = 'ADD_NEW_EVENT';
// Reducer function
export const calendarReducer = (state, action) => {
    var _a, _b;
    switch (action.type) {
        case SET_CALENDAR_STATE: {
            const { payload } = action;
            return Object.assign(Object.assign({}, state), payload);
        }
        case INITIALIZE_CALENDAR: {
            const { payload } = action;
            return Object.assign(Object.assign({}, state), { calendarApi: payload });
        }
        case HANDLE_SELECT: {
            const { payload } = action;
            return Object.assign(Object.assign({}, state), { openNewEventModal: true, selectedStartDate: payload.start, selectedEndDate: payload.end });
        }
        case REMOVE_EVENT: {
            (_a = state.selectedEvent) === null || _a === void 0 ? void 0 : _a.remove();
            return Object.assign(Object.assign({}, state), { selectedEvent: null });
        }
        case ADD_NEW_EVENT: {
            const { payload } = action;
            (_b = state.calendarApi) === null || _b === void 0 ? void 0 : _b.addEvent(payload);
            return Object.assign(Object.assign({}, state), { openNewEventModal: false });
        }
        default:
            return state;
    }
};
