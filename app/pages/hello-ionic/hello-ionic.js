import {Page} from 'ionic-framework/ionic';


@Page({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  constructor() {
    this.apiKey = JSON.parse( localStorage.getItem("api-key"));
  }

  save(key) {
    localStorage.setItem("api-key", JSON.stringify(this.apiKey));
  }
}
