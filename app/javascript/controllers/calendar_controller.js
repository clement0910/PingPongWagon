import { Controller } from "stimulus"
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import Rails from '@rails/ujs'

const date = new Date;

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

let date_tom;
let remove;
const delay = (n) => new Promise( r => setTimeout(r, n*1000));

const getBusinessStartTime = () => {
    if (date.getHours() < 8) {
        return '08:00'
    }
    else {
        return date.timeNow()
    }
}

export default class extends Controller {
    static targets = ["calendar", "modal", "modalremove", "btn", "removebtn"]

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
            editable: true,
            selectable: true,
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
            select: function(date) {
                _this.modalTarget.classList.add('modal-open')
                date_tom = date;
            },
            eventMouseEnter: function (data) {
                // let btn = document.createElement("button");
                remove = data.event.id
                // btn.classList.add('btn');
                // btn.innerHTML = 'X';
                // btn.setAttribute("id", "yolo");
                // btn.setAttribute("data-target", "removebtn");
                // btn.setAttribute("data-action", "click->calendar#remove_booking")
                // data.el.appendChild(btn);
            },
            // eventMouseLeave: function (data) {
            //     let btn = document.getElementById("yolo");
            //     if (btn) {
            //         btn.remove();
            //     }
            // },
            eventContent: function(arg) {
                return {
                html: "<button class='btn' data-target='removebtn' data-action='click->calendar#remove_booking'>X</button>" }

                let italicEl = document.createElement('i')

                if (arg.event.extendedProps.isUrgent) {
                    italicEl.innerHTML = 'urgent event'
                } else {
                    italicEl.innerHTML = 'normal event'
                }

                let arrayOfDomNodes = [ italicEl ]
                return { domNodes: arrayOfDomNodes }
            }
        })
        calendar.render()
    }

    disable() {
        this.modalTarget.classList.remove('modal-open')
    }

    disable2() {
        this.modalremoveTarget.remove('modal-open')
    }


    remove_booking() {
        this.modalremoveTarget.classList.add('modal-open');
    }

    remove_booking2() {
        Rails.ajax({
            type: 'DELETE',
            url: `http://localhost:3000/bookings/${remove}`,
        })
    }
     async validate_booking() {
        const url = `${window.location.href}bookings`;
        let data = {"booking[start]": date_tom.start, "booking[end]": date_tom.end}
        this.btnTarget.classList.add('loading');
        await delay(2);
        this.modalTarget.classList.remove('modal-open');
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