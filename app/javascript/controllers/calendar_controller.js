import { Controller } from "stimulus"
import {Calendar} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import Rails from '@rails/ujs'

const date = new Date;
let selectDate;

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

const getBusinessStartTime = () => {
    if (date.getHours() < 8) {
        return '08:00';
    }
    else {
        return date.timeNow();
    }
}

let currentUserId;

const getCurrentUserId = (data) => {
    currentUserId = data.id
}

Rails.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/current_user_id.json',
    success: function(data) {
        getCurrentUserId(data)
    }
});

const returngood = (event) => {
    console.log(event);
    return false;
}
export default class extends Controller {
    static targets = ["calendar", "modalCreate", "modalRemove"]

    connect() {
        let _this = this;
        let eventslist = '/bookings.json'
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
            slotDuration: '00:10:00',
            navLinks: false,
            headerToolbar: false,
            height: 800,
            nowIndicator: true,
            eventOverlap: false,
            selectOverlap: false,
            locale: frLocale,
            timeZone: 'Europe/Paris',
            businessHours: {
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: getBusinessStartTime(),
                endTime: '21:00', // an end time (6pm in this example)
            },
            eventConstraint: {
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: getBusinessStartTime(),
                endTime: '21:00',
            },
            selectConstraint: {
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: getBusinessStartTime(),
                endTime: '21:00',
            },
            scrollTime: date.timeNow(),
            events: eventslist,
            editable: true, selectable: true,
            eventAllow: function (dropInfo, draggedEvent) {
                console.log(dropInfo)
                if (currentUserId != draggedEvent._def.extendedProps.user) {
                    return false
                }
                else {
                    return true
                }
            },
            eventDrop: function (info) {
                let data = _this.data(info)
                Rails.ajax({
                    type: 'PATCH',
                    url: `http://localhost:3000/bookings/${info.event.id}`,
                    data: new URLSearchParams(data).toString(),
                })
            },
            eventClick: function (info) {
                info.jsEvent.preventDefault();
            },
            eventResize: function (info) {
                let data = _this.data(info)
                Rails.ajax({
                    type: 'PATCH',
                    url: `http://localhost:3000/bookings/${info.event.id}`,
                    data: new URLSearchParams(data).toString()
                })
            },
            select: function(date) {
                _this.modalCreateTarget.classList.add('modal-open');
                selectDate = date;
            },
            eventContent: function(event) {
                let startEvent = event.event._instance.range.start;
                startEvent.setHours(startEvent.getHours() - 1);
                if (startEvent > date && currentUserId === event.event._def.extendedProps.user) {
                    startEvent.setHours(startEvent.getHours() + 1);
                    return { html: `<div class="flex justify-between mr-2"><div>${event.event._def.title}</div>  <button class='btn btn-outline btn-square btn-xs' data-action='click->calendar#openRemoveBookingModal' data-id="${event.event._def.publicId}" data-user="${event.event._def.extendedProps.user}">X</button></div>` }
                }
                else {
                    startEvent.setHours(startEvent.getHours() + 1);
                    return { html: `<div>${event.event._def.title}</div>` }
                }

            },

        })
        calendar.render()
    }

    closeCreateBookingModal() {
        this.modalCreateTarget.classList.remove('modal-open');
    }

    closeRemoveBookingModal() {
        this.modalRemoveTarget.classList.remove('modal-open');
    }

    openRemoveBookingModal(event) {
        console.log(event.target.dataset.user);
        const btn = document.getElementById("removeBookingBtn");
        this.modalRemoveTarget.classList.add('modal-open');
        btn.setAttribute("data-id", event.target.dataset.id.toString());
    }

    removeBooking(event) {
        const bookingId = event.target.dataset.id;
        Rails.ajax({
            type: 'DELETE',
            url: `http://localhost:3000/bookings/${bookingId}`,
        })
    }

     createBooking() {
        const url = `${window.location.href}bookings`;
        let data = {"booking[start]": selectDate.start, "booking[end]": selectDate.end}
        Rails.ajax({
            type: 'POST',
            url: url,
            data: new URLSearchParams(data).toString()
        })
    }

    data(info) {
        return {
            "booking[start]": info.event.start,
            "booking[end]": info.event.end,
        }
    }


}