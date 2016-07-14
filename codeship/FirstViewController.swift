
import UIKit

import Alamofire

import SwiftyJSON


class FirstViewController: UITableViewController {
    
    
    @IBOutlet var projectTable: UITableView!
    let apiKey = "cc0628f21b6f01f2b66e7cfc03f1422004583f6cff60df773867ce7af695"
    var projects = Array<Project>()
    var selectedProject: Project?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadProjects()
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(FirstViewController.loadProjects), forControlEvents: UIControlEvents.ValueChanged)
        self.refreshControl = refreshControl

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        let clickedProject = self.projects[indexPath.row] as Project
        print(clickedProject.repositoryName)
        self.selectedProject = clickedProject
        performSegueWithIdentifier("projectDeatilSegue", sender: self)
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?){
        if (segue.identifier == "projectDeatilSegue") {
            let viewController = segue.destinationViewController as! ProjectDetailViewController
            viewController.selectedProject = self.selectedProject
            self.selectedProject = nil
        }
    }
    
    override func shouldPerformSegueWithIdentifier(identifier: String?, sender: AnyObject?) -> Bool {
        if (identifier == "projectDeatilSegue") {
            return self.selectedProject != nil
        } 
        return true
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.projects.count;
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = self.projectTable.dequeueReusableCellWithIdentifier("ProjectTableViewCell") as! ProjectTableViewCell
        cell.lblName?.text = self.projects[indexPath.row].repositoryName
        cell.lblType?.text = self.projects[indexPath.row].repositoryProvider
        return cell
    }
    
    func loadProjects() {
        Alamofire.request(.GET, "https://codeship.com/api/v1/projects.json", parameters: ["api_key": apiKey])
            .responseJSON { response in
                switch response.result {
                case .Success(let data):
                    var json = JSON(data)
                    if(self.projects.count > 0){
                        self.projects = Array<Project>()
                        self.projectTable.reloadData()    
                    }
                    for (_, subJson) in json["projects"] {
                        let repository_name = subJson["repository_name"].string
                        let repository_provider = subJson["repository_provider"].string
                        var builds = Array<Build>()
                        for (_, buildJson) in subJson["builds"] {
                            let build = Build(status: buildJson["status"].string!, branch: buildJson["branch"].string!)
                            //,commitId: buildJson["commit_id"].string!,githubUsername: buildJson["github_username"].string!
                            builds.append(build) 
                        }
                        let project = Project(repository_name: repository_name!, reporitory_provider: repository_provider!,builds: builds)
                        self.projects.append(project)
                    }
                    self.projectTable.reloadData()
                    self.refreshControl?.endRefreshing()
                    print(self.projects)
                case .Failure(let error):
                    print("Request failed with error: \(error)")
                }
        }

    }
    

}

