

import Foundation

class Build {
//    let id: NSNumber
//    let projectId: NSNumber
    //    var message: String
    //    var startedAt: String
    //    var finishedAt: String
//    var githubUsername: String
    var status: String
    var branch: String
//    var commitId: String
    
    init(status: String, branch: String) {
        self.status = status
        self.branch = branch
        //commitId: String, githubUsername: String
//        self.commitId = commitId
//        self.githubUsername = githubUsername
    }
}