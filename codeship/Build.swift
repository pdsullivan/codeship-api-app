import Foundation
import SwiftyJSON
import SwiftMoment

class Build {
    
    let id: NSNumber
    var message: String!
    var buildMinutes: String!
    var startedAt: String!
    var githubUsername: String!
    var status: String!
    var branch: String!
    var commitId: String!
    var buildJson: JSON!

    init(_buildJson: JSON) {
        buildJson = _buildJson
        self.id = self.buildJson["id"].number!
        self.populateGithubContent()
        self.startedAt = self.startMoment().format("MM/dd/YY, h:mm a")
        self.buildMinutes = self.buildDurationInMinutes()
    }

    func buildDurationInMinutes() -> String {
        var endMoment = moment()
        let now = moment()
        let start = startMoment()
        if self.buildJson["finished_at"] != nil {
            endMoment = moment(self.buildJson["finished_at"].string!)!
        } else {
            endMoment = now
        }
        let diff = endMoment.intervalSince(start)
        let y = Double(round(1*diff.minutes)/1) as NSNumber
        return String(y)
    }

    func startMoment() -> Moment {
        let startMoment = moment(self.buildJson["started_at"].string!)!
        return startMoment
    }

    func populateGithubContent(){
        self.status = self.buildJson["status"].string!
        self.branch = buildJson["branch"].string!
        if self.buildJson["github_username"] != nil {
            self.githubUsername = self.buildJson["github_username"].string!
        }
        if self.buildJson["commit_id"] != nil {
            self.commitId = self.buildJson["commit_id"].string!
        }
        if self.buildJson["message"] != nil {
            self.message = self.buildJson["message"].string!
        }
    }
}
