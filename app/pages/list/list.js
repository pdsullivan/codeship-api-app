import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {ItemDetailsPage} from '../item-details/item-details';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';


@Page({
  templateUrl: 'build/pages/list/list.html',
  viewProviders: [HTTP_PROVIDERS]
})
export class ListPage {
  constructor(@Inject(NavController) nav, @Inject(NavParams) navParams, http: Http) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.apiKey = JSON.parse( localStorage.getItem("api-key"));
    var baseUrl = "";
    if (document.location.hostname == "localhost") {
        baseUrl = 'http://localhost:8100/api/';
    } else {
        baseUrl = 'https://codeship.com/';
    }
    http.get(baseUrl + '/api/v1/projects.json?api_key=' + this.apiKey)
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(projects => this.projects = projects.projects);
    //
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
    //
    // this.items = [];
    // for(let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
}