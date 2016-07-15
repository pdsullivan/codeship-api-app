import Foundation
import UIKit
import SwiftIconFont

class BuildTableViewCell: UITableViewCell {
    
    @IBOutlet weak var lblBranch: UILabel!
    @IBOutlet weak var lblStatus: UILabel!
    @IBOutlet weak var lblUsername: UILabel!
    @IBOutlet weak var lblMessage: UILabel!
    @IBOutlet weak var testingSpinner: UIActivityIndicatorView!
    @IBOutlet weak var branchIcon: UILabel!
    @IBOutlet weak var userIcon: UILabel!
    
    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
        
        
        //branchIcon
//        branchIcon.font = UIFont.iconFontOfSize(.FontAwesome, fontSize: 50.0)
//        branchIcon.text = String.fontAwesomeIconWithCode("twitter")
    }
    
    func setColors()  {
        if lblStatus.text == "error" {
            lblStatus.textColor = UIColor.whiteColor()
            lblStatus.backgroundColor = UIColor.redColor()
        } else if lblStatus == "success" {
            lblStatus.textColor = UIColor.whiteColor()
            lblStatus.backgroundColor = UIColor.greenColor()
        } else if lblStatus == "waiting" {
            lblStatus.textColor = UIColor.whiteColor()
            lblStatus.backgroundColor = UIColor.darkGrayColor()
        }
    }
}