

import Foundation

import SwiftyJSON

class Build {
//    let id: NSNumber
//    let projectId: NSNumber
    var message: String!
    //    var startedAt: String
    //    var finishedAt: String
    var githubUsername: String!
    var status: String
    var branch: String
    var commitId: String!
    
    init(buildJson: JSON) {
        //status: buildJson["status"].string!, branch: buildJson["branch"].string!,githubUsername: buildJson["github_username"]
        
        self.status = buildJson["status"].string!
        self.branch = buildJson["branch"].string!
        //commitId: String, 
//        self.commitId = commitId
        if buildJson["github_username"] != nil {
            self.githubUsername = buildJson["github_username"].string!
        }
        if buildJson["commit_id"] != nil {
            self.commitId = buildJson["commit_id"].string!
        }
        
        if buildJson["message"] != nil {
            self.message = buildJson["message"].string!
        }
        
    }
}