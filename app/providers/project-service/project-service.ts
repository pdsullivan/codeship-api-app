import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
        this.codeshipApiKey = localStorage.getItem('codeshipApiKey');
    }

    loadProject(project){
        this.codeshipApiKey = localStorage.getItem('codeshipApiKey');
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/api/v1/projects/${project.id}.json?api_key=${this.codeshipApiKey}`)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data.projects);
                });
        });
    }

    restartBuild(build) {
        this.codeshipApiKey = localStorage.getItem('codeshipApiKey');
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/api/v1/builds/${build.id}/restart.json?api_key=${this.codeshipApiKey}`)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    load() {
        this.codeshipApiKey = localStorage.getItem('codeshipApiKey');
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/api/v1/projects.json?api_key=${this.codeshipApiKey}`)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data.projects);
                });
        });
    }
}
