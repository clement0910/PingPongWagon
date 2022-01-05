import { Controller } from "stimulus"
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import Rails from '@rails/ujs'

export default class extends Controller {
    static targets = ["calendar"]

    connect() {
        let _this = this
        let eventslist = JSON.parse(_this.calendarTarget.dataset.events);
        let calendar = new Calendar(this.calendarTarget, {
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
            height: 800,
            nowIndicator: true,
            locale: frLocale,
            timeZone: 'Europe/Paris',
            events: eventslist,
            editable: true,
            eventDrop: function (info) {
                let data = _this.data(info)
                Rails.ajax({
                    type: 'PATCH',
                    url: `http://localhost:3000/bookings/${info.event.id}`,
                    data: new URLSearchParams(data).toString()
                })
            },
            eventResize: function (info) {
                let data = _this.data(info)
                Rails.ajax({
                    type: 'PATCH',
                    url: `http://localhost:3000/bookings/${info.event.id}`,
                    data: new URLSearchParams(data).toString()
                })
            },
        })
        calendar.render()
    }

    data(info) {
        return {
            "booking[start]": info.event.start,
            "booking[end]": info.event.end,
        }
    }
}