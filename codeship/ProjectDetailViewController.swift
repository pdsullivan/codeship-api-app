
import UIKit

import SwiftIconFont

class ProjectDetailViewController: UITableViewController {

    var selectedProject: Project?

    @IBOutlet var buildsTable: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = self.selectedProject!.repositoryName
        // Do any additional setup after loading the view, typically from a nib.
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(ProjectDetailViewController.loadProject), forControlEvents: UIControlEvents.ValueChanged)
        self.refreshControl = refreshControl
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.selectedProject!.builds.count;
    }

    func loadProject() {
        let api = CodeshipApi()
        api.getProject(self.selectedProject!){ (project: Project!) in
            self.selectedProject = project
            self.buildsTable.reloadData()
            self.refreshControl?.endRefreshing()
        }
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = self.buildsTable.dequeueReusableCellWithIdentifier("buildCell") as! BuildTableViewCell
        cell.build = self.selectedProject!.builds[indexPath.row]
        cell.setValues()
        return cell
    }

}
