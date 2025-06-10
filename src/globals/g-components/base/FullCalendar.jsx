var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import ReactFullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import { useCalendarContext } from 'providers/CalendarProvider';
import { useAppContext } from 'providers/AppProvider';
import { INITIALIZE_CALENDAR } from 'reducers/CalendarReducer';
const FullCalendar = (_a) => {
    var rest = __rest(_a, []);
    const calendarRef = useRef(null);
    const { config: { isRTL } } = useAppContext();
    const { view, calendarDispatch } = useCalendarContext();
    useEffect(() => {
        var _a;
        const api = (_a = calendarRef.current) === null || _a === void 0 ? void 0 : _a.getApi();
        if (api) {
            calendarDispatch({ type: INITIALIZE_CALENDAR, payload: api });
        }
    }, []);
    return (<ReactFullCalendar ref={calendarRef} plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView={view} headerToolbar={false} dayMaxEvents={3} stickyHeaderDates={false} editable selectable selectMirror direction={isRTL ? 'rtl' : 'ltr'} eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: true
        }} {...rest}/>);
};
export default FullCalendar;
