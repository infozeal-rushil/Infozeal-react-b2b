import { useContext, createContext, useReducer } from 'react';
import { calendarReducer } from 'reducers/CalendarReducer';
export const CalendarContext = createContext({});
const CalendarProvider = ({ children }) => {
    const initialState = {
        calendarApi: null,
        title: '',
        view: 'dayGridMonth',
        selectedEvent: null,
        openNewEventModal: false,
        selectedStartDate: '',
        selectedEndDate: ''
    };
    const [calendarState, calendarDispatch] = useReducer(calendarReducer, initialState);
    return (<CalendarContext.Provider value={Object.assign(Object.assign({}, calendarState), { calendarDispatch })}>
      {children}
    </CalendarContext.Provider>);
};
export const useCalendarContext = () => useContext(CalendarContext);
export default CalendarProvider;
