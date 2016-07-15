
import UIKit

import SwiftIconFont

class ProjectDetailViewController: UITableViewController {
    
    var selectedProject: Project?
    
    @IBOutlet var buildsTable: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = self.selectedProject!.repositoryName
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.selectedProject!.builds.count;
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = self.buildsTable.dequeueReusableCellWithIdentifier("buildCell") as! BuildTableViewCell
        cell.lblBranch?.text = self.selectedProject!.builds[indexPath.row].branch
        cell.lblStatus?.text = self.selectedProject!.builds[indexPath.row].status
        cell.lblMessage?.text = self.selectedProject!.builds[indexPath.row].message
        cell.lblUsername?.text = self.selectedProject!.builds[indexPath.row].githubUsername
        cell.testingSpinner.hidden = true
        if self.selectedProject!.builds[indexPath.row].status == "testing" {
            cell.testingSpinner.startAnimating()
            cell.lblStatus.hidden = true
        } else {
            cell.testingSpinner.stopAnimating()
        }
        
        cell.userIcon.parseIcon()
        cell.branchIcon.parseIcon()
        cell.setColors()
        return cell
    }
    
}

