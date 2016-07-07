import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {GithubService} from '../../providers/github-service/github-service';
import {CapitalizePipe} from '../../pipes/capitalize-pipe';

@Component({
    templateUrl: 'build/pages/project-builds/project-builds.html',
    providers: [GithubService],
    pipes: [CapitalizePipe]
})
export class ProjectBuildsPage {

    public project: any;
    public users: Array<any>;
    public usernames: Array<any>;

    constructor(private nav: NavController, navParams: NavParams, private githubService: GithubService) {
        this.project = navParams.get("project");
        this.loadUserDataForBuilds();
    }

    getUserImageUrl(username) {
        let user = this.users.find(user => user.login == username)
        if(user){
            return user.avatar_url;
        } else {
            return null;
        }
    }

    loadUserDataForBuilds() {
        let builds = this.project.builds;
        this.usernames = Array.from(builds, build => build["github_username"]);
        this.usernames = Array.from(new Set(this.usernames));
        this.users = [];
        for (let username of this.usernames) {
            this.githubService.getUser(username)
                .then(data => {
                    this.users.push(data);
                });
        }
    }

}
