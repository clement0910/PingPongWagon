import { Controller } from "stimulus";
import Rails from '@rails/ujs'
import {green, red} from "tailwindcss/colors";

export default class extends Controller {
    static targets = ["disturb", "disturbState", "description"]

    connect() {
        if (this.disturbTarget.checked) {
            this.activatedDisturbMode()
        } else {
            this.disabledDisturbMode()
        }
    }

    activatedDisturbMode() {
        if (this.disturbStateTarget.classList.contains('text-green-400')) {
            this.disturbStateTarget.classList.remove('text-green-400');
        }
        this.disturbStateTarget.classList.add('text-red-600');
        this.disturbStateTarget.innerText = 'activated'
        this.descriptionTarget.innerText = 'An Alert has been display on the website.'
    }

    disabledDisturbMode() {
        console.log("DODO")
        if (this.disturbStateTarget.classList.contains('text-red-600')) {
            this.disturbStateTarget.classList.remove('text-red-600');
        }
        this.disturbStateTarget.classList.add('text-green-400');
        this.disturbStateTarget.innerText = 'disable'
        this.descriptionTarget.innerText = 'You can activate "No Disturb" Mode if you want to work quietly'
    }

    noDisturbMode() {
        Rails.ajax({
            type: 'POST',
            url: `http://localhost:3000/users/nodisturb`
        })
        if (this.disturbTarget.checked) {
            this.activatedDisturbMode()
        } else {
            this.disabledDisturbMode()
        }
    }
}
