import { Controller } from "stimulus"
import Rails from '@rails/ujs'

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


export default class extends Controller {
    static targets = ["modal", "select", "userImage", "personalScore", "enemyScore"]

    connect() {
    }

    changeUser(event) {
        if (event.target.localName === "a") {
            const userImg = event.target.firstElementChild.firstElementChild.firstElementChild.src;
            this.selectTarget.innerHTML = event.target.innerText
            this.selectTarget.setAttribute("data-user", event.target.dataset.user)
            this.userImageTarget.src = userImg;
        }

    }
    openModal() {
        this.modalTarget.classList.add("modal-open");
    }

    closeModal() {
        this.modalTarget.classList.remove("modal-open");
    }

    createMatch() {
        let data;
        if (this.personalScoreTarget.value > this.enemyScoreTarget.value) {
            data = {"match[winner_score]": this.personalScoreTarget.value, "match[loser_score]": this.enemyScoreTarget.value,
                "match[winner_id]": currentUserId, "match[loser_id]": this.selectTarget.dataset.user}
        }
        else {
            data = {"match[loser_score]": this.personalScoreTarget.value, "match[winner_score]": this.enemyScoreTarget.value,
                "match[loser_id]": currentUserId, "match[winner_id]": this.selectTarget.dataset.user}
        }
        const url = `${window.location.href}matches`;
        Rails.ajax ({
            type: 'POST',
            url: url,
            data: new URLSearchParams(data).toString()
        })
    }
}
