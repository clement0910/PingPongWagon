import { Controller } from "stimulus";
import Rails from '@rails/ujs'
import {green, red} from "tailwindcss/colors";

export default class extends Controller {
    static targets = ["disturb", "disturbState"]

    connect() {
        console.log(this.disturbStateTarget)
        if (this.disturbTarget.checked) {
            console.log("TOTO")
            this.disturbStateTarget.classList.add('text-red-600')
            console.log(this.disturbStateTarget)
        } else {
            console.log("DODO")
            this.disturbStateTarget.classList.add('text-green-400')
            console.log(this.disturbStateTarget)
        }
    }

    hello() {
        console.log(this.disturbTarget.checked)
    }

    noDisturbMode() {
        Rails.ajax({
            type: 'POST',
            url: `http://localhost:3000/users/nodisturb`
        })

    }
}
