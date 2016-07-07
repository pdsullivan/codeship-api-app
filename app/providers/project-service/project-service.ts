import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProjectService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectService {
    data: any;
    baseUrl: string;
    codeshipApiKey: string;

    constructor(private http: Http) {
        this.data = null;
        if (document.location.hostname == "localhost") {
            this.baseUrl = 'http://localhost:8100/api/';
        } else {
            this.baseUrl = 'https://codeship.com/';
        }
        this.codeshipApiKey = "cc0628f21b6f01f2b66e7cfc03f1422004583f6cff60df773867ce7af695";
    }

    load() {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            this.http.get(`${this.baseUrl}/api/v1/projects.json?api_key=${this.codeshipApiKey}`)
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data.projects);
                });
        });
    }
}
