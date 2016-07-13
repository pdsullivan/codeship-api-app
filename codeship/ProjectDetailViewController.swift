
import UIKit

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
        let cell:UITableViewCell = self.buildsTable.dequeueReusableCellWithIdentifier("buildCell")! as UITableViewCell
        cell.textLabel?.text = self.selectedProject!.builds[indexPath.row].branch
        cell.detailTextLabel?.text = "Status: " + self.selectedProject!.builds[indexPath.row].status
        return cell
    }
    
}

