import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams, Loading, Alert} from 'ionic-angular';
import {GithubService} from '../../providers/github-service/github-service';
import {CapitalizePipe} from '../../pipes/capitalize-pipe';
import {SafariViewController} from 'ionic-native';
import {ProjectService} from '../../providers/project-service/project-service';

@Component({
    templateUrl: 'build/pages/project-builds/project-builds.html',
    providers: [GithubService, ProjectService],
    pipes: [CapitalizePipe]
})
export class ProjectBuildsPage {

    public project: any;
    public users: Array<any>;
    public usernames: Array<any>;
    public loading: any;

    constructor(public projectService: ProjectService, private nav: NavController, navParams: NavParams, private githubService: GithubService) {
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

    restartBuildClick(build) {
        let confirm = Alert.create({
          title: 'Restart Build?',
          message: 'You sure?',
          buttons: [
            {
              text: 'Nope',
              handler: () => {
                
              }
            },
            {
              text: 'Yep',
              handler: () => {
                this.restartBuild(build)
              }
            }
          ]
        });
        this.nav.present(confirm);
    }

    restartBuild(build) {
        this.presentLoading();
        this.projectService.restartBuild(build)
            .then(data => {
                this.project = data;
                this.loading.dismiss();
            });
    }


    presentLoading() {
        this.loading = Loading.create({
            content: "Loading..."
        });
        this.nav.present(this.loading);
    }

    clickOpenCommit(build){
        let url = "https://github.com/" + this.project.repository_name + "/commit/" + build.commit_id;
        window.open(url, '_system', 'location=yes'); return false;
    }

}
