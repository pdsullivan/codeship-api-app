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
    @IBOutlet weak var lblBuildStartedAt: UILabel!
    @IBOutlet weak var lblBuildTime: UILabel!

    var build: Build!

    required init?(coder decoder: NSCoder) {
        super.init(coder: decoder)
    }

    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if superview != nil {
            setIconFontForLabels()
            setValues()
            setColors()
        }
    }

    func setIconFontForLabels(){
        self.userIcon.parseIcon()
        self.branchIcon.parseIcon()
    }

    func setValues () {
        self.lblBranch?.text = self.build.branch
        self.lblStatus?.text = self.build.status
        self.lblMessage?.text = self.build.message
        self.lblUsername?.text = self.build.githubUsername
        self.lblBuildTime?.text = self.buildDurationtext()
        self.lblBuildStartedAt?.text = self.build.startedAt
        self.testingSpinner.hidden = true
        if self.build.status == "testing" {
            self.testingSpinner.startAnimating()
            self.lblStatus.hidden = true
        } else {
            self.testingSpinner.stopAnimating()
        }
    }

    func buildDurationtext () -> String {
        if self.build.status == "testing" {
            return "Testing for " + self.build.buildMinutes + " Minutes"
        } else {
            return "Completed in " + self.build.buildMinutes + " Minutes"
        }
    }

    func setColors()  {
        if self.build.status == "error" {
            lblStatus.textColor = UIColor.redColor()
        } else if self.build.status == "success" {
            lblStatus.textColor = UIColor.greenColor()
        } else if self.build.status == "waiting" {
            lblStatus.textColor = UIColor.lightGrayColor()
        } else {
            lblStatus.textColor = UIColor.grayColor()
        }
    }
}
