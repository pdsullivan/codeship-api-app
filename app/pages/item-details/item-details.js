import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
@Page({
  templateUrl: 'build/pages/item-details/item-details.html',
  viewProviders: [HTTP_PROVIDERS]
})
export class ItemDetailsPage {
  constructor(@Inject(NavController) nav, @Inject(NavParams) navParams, http: Http) {
    this.nav = nav;
    // http.get('https://swapi.co/api/people/1')
    //   // Call map on the response observable to get the parsed people object
    //   .map(res => res.json())
    //   // Subscribe to the observable to get the parsed people object and attach it to the
    //   // component
    //   .subscribe(people => this.people = people);

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.title = "test";

  }
}
