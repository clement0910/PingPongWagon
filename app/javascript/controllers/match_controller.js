import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["modal", "select"]

    connect() {
        console.log("connected");
        console.log(this.selectTarget.innerHTML)
    }

    changeuser(event) {
        console.log(this.selectTarget)
        this.selectTarget.innerHTML = event.target.innerText

    }
    openModal() {
        console.log("HELLO WORLD")
        this.modalTarget.classList.add("modal-open");
    }

    closeModal() {
        this.modalTarget.classList.remove("modal-open");
    }
}