import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["modal", "select", "userImage", "personalScore", "enemyScore"]

    connect() {
    }

    changeUser(event) {
        if (event.target.localName === "a") {
            const userImg = event.target.firstElementChild.firstElementChild.firstElementChild.src;
            this.selectTarget.innerHTML = event.target.innerText
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
        const enemy = this.selectTarget.innerText
        const myscore = this.personalScoreTarget.value;
        const enemyvalue = this.enemyScoreTarget.value;
        console.log(enemy);
        console.log(enemyvalue);
        console.log(myscore);
    }
}