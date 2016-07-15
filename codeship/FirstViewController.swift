import UIKit
import Alamofire
import SwiftyJSON

class FirstViewController: UITableViewController {
    
    
    @IBOutlet var projectTable: UITableView!
    
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
        let api = CodeshipApi()
        api.listProjects{ (projects: Array<Project>) in
            if(self.projects.count > 0){
                self.projects = Array<Project>()
                self.projectTable.reloadData()    
            }
            self.projects = projects
            
            self.projectTable.reloadData()
            self.refreshControl?.endRefreshing()
        }
        
    }
    

}

