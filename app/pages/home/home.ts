import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProjectService} from '../../providers/project-service/project-service';
import {ProjectBuildsPage} from '../../pages/project-builds/project-builds';
import {Loading} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers: [ProjectService]
})
export class HomePage {
    public projects: any;
    constructor(public projectService: ProjectService, private navController: NavController) {
        this.loadPeople();
    }

    loadPeople(){
        this.presentLoading();
        this.projectService.load()
            .then(data => {
                this.projects = data;
            });
    }

    presentLoading() {
        let loading = Loading.create({
            content: "Loading...",
            duration: 1000
        });
        // this.navController.present(loading);
    }

    clickProject(project) {
        console.log(`click project`)
        this.navController.push(ProjectBuildsPage, {project: project});
    }
}
