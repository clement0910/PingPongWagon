import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';

// const getStartTimeCalendar = () => {
//     const date = new Date
//
//     if (date.getHours() < 8) {
//         return '08:00:00'
//     }
//     else {
//         console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
//         return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
//     }
// }

const date = new Date;

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

const getBusinessStartTime = () => {
    if (date.getHours() < 8) {
        return '08:00'
    }
    else {
        return date.timeNow()
    }
}

const initFullCalendar = () => {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        let calendar = new Calendar(calendarEl, {
            plugins: [ timeGridPlugin ],
            views: {
                timeGridDay: {
                    type: 'timeGrid',
                    duration: {days: 1},
                    buttonText: 'day'
                }
            },
            initialView: 'timeGridDay',
            allDaySlot: false,
            slotDuration: '00:15:00',
            navLinks: false,
            headerToolbar: false,
            height: 600,
            nowIndicator: true,
            locale: 'frLocale',
            timeZone: 'Europe/Paris',
            businessHours: {
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: getBusinessStartTime(),
                endTime: '21:00', // an end time (6pm in this example)
            },
           scrollTime: date.timeNow()

        });
        calendar.render();
    }
};


export { initFullCalendar }