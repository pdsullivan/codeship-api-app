import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {
    public apiKey: any;
    constructor(private navController: NavController) {
        this.apiKey = localStorage.getItem('codeshipApiKey');
    }

    saveApiKey(){
        localStorage.setItem('codeshipApiKey',this.apiKey);
    }
}
