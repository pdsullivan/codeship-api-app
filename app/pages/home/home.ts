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
    public loading: any;
    constructor(public projectService: ProjectService, private navController: NavController) {
        this.loadPeople();
    }

    loadPeople(){
        this.presentLoading();
        this.projectService.load()
            .then(data => {
                this.projects = data;
                this.loading.dismiss();
            });
    }

    presentLoading() {
        this.loading = Loading.create({
            content: "Loading..."
        });
        this.navController.present(this.loading);
    }

    clickProject(project) {
        console.log(`click project`)
        this.navController.push(ProjectBuildsPage, {project: project});
    }
}
