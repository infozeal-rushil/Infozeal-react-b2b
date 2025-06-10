import CalendarAddNewEventModal from '@globals/g-components/modals/CalendarAddNewEventModal';
import CalendarProvider, { useCalendarContext } from '@globals/g-providers/CalendarProvider';
import CalendarTop from './CalendarTop';
import CalendarHeader from './CalendarHeader';
import CalendarEventModal from '@globals/g-components/modals/CalendarEventModal';
import { HANDLE_SELECT, SET_CALENDAR_STATE } from '@globals/g-reducers/CalendarReducer';
import FullCalendar from '@globals/g-components/base/FullCalendar';
import events from '@globals/g-data/calendarEvents';
const index = () => {
    return (<CalendarProvider>
      <Calendar />
    </CalendarProvider>);
};
const Calendar = () => {
    const { calendarDispatch } = useCalendarContext();
    const handleEventClick = (info) => {
        if (info.event.url) {
            window.open(info.event.url);
            info.jsEvent.preventDefault();
        }
        else {
            calendarDispatch({
                type: SET_CALENDAR_STATE,
                payload: {
                    selectedEvent: info.event
                }
            });
        }
    };
    return (<div>
      <CalendarTop />
      <CalendarHeader />
      <div className="mt-6 mb-9">
        <FullCalendar height={800} select={info => {
            calendarDispatch({
                type: HANDLE_SELECT,
                payload: info
            });
        }} events={events} eventClick={handleEventClick}/>
      </div>
      <CalendarEventModal />
      <CalendarAddNewEventModal />
    </div>);
};
export default index;
