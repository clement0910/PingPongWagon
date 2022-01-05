import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';

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
        const coachEvents = JSON.parse(calendarEl.dataset.events);
        console.log(coachEvents)
        let calendar = new Calendar(calendarEl, {
            plugins: [ timeGridPlugin, interactionPlugin ],
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
            locale: frLocale,
            timeZone: 'Europe/Paris',
            businessHours: {
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: getBusinessStartTime(),
                endTime: '21:00', // an end time (6pm in this example)
            },
           scrollTime: date.timeNow(),
           selectable: true,
           events: coachEvents,
           select: function(date) {
                const url = `${window.location.href}bookings`;
                const csrfToken = document.querySelector("[name='csrf-token']").content
                fetch(url, {
                    method: 'POST',
                    headers: {
                        "X-CSRF-Token": csrfToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({start: date.start, end: date.end})
                }).then(r => console.log(r));
                calendar.render()
            }
        });
        calendar.render();
    }
};


export { initFullCalendar }