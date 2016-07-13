
import UIKit

import Alamofire

import SwiftyJSON


class FirstViewController: UITableViewController {
    
    
    @IBOutlet var projectTable: UITableView!
    let apiKey = ""
    var projects = Array<Project>()
    
//    var items: [String] = ["We", "Heart", "Swift"]
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.projects.count;
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell:UITableViewCell = self.projectTable.dequeueReusableCellWithIdentifier("projectCell")! as UITableViewCell
        
        cell.textLabel?.text = self.projects[indexPath.row].repositoryName
        
        return cell
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadProjects()
        var refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: Selector("loadProjects"), forControlEvents: UIControlEvents.ValueChanged)
        self.refreshControl = refreshControl

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func tableView(tableView: UITableView, didDeselectRowAtIndexPath indexPath: NSIndexPath) {
        let selectedProject = self.projects[indexPath.row] as Project
        print(selectedProject)
    }
    
    func loadProjects() {
        Alamofire.request(.GET, "https://codeship.com/api/v1/projects.json", parameters: ["api_key": apiKey])
            .responseJSON { response in
                switch response.result {
                case .Success(let data):
                    var json = JSON(data)
                    for (_, subJson) in json["projects"] {
                        let repository_name = subJson["repository_name"].string
                        let repository_provider = subJson["repository_provider"].string
                        let project = Project(repository_name: repository_name!, reporitory_provider: repository_provider!)
                        self.projects.append(project)
                    }
//                    projectTable.dataSource = self.projects
                    self.projectTable.reloadData()
                    
                    self.refreshControl?.endRefreshing()
                    print(self.projects)
                case .Failure(let error):
                    print("Request failed with error: \(error)")
                }
        }

    }
    

}

