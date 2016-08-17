import Foundation
import Alamofire
import SwiftyJSON

class CodeshipApi {

    var projects = Array<Project>()

    init() {

    }

    var key: String! {
        get {
            let defaults = NSUserDefaults.standardUserDefaults()
            if let name = defaults.stringForKey("codeship_api_key") {
                return name
            } else {
                return nil
            }
        }
        set {
            let defaults = NSUserDefaults.standardUserDefaults()
            defaults.setObject(newValue, forKey: "codeship_api_key")
        }
    }

    func listProjects(completionBlock: (Array<Project>) -> ())  {
        if self.key == nil {
            return completionBlock(self.projects)
        }
        Alamofire.request(.GET, "https://codeship.com/api/v1/projects.json", parameters: ["api_key": self.key])
            .responseJSON { response in
                switch response.result {
                case .Success(let data):
                    var json = JSON(data)
                    for (_, subJson) in json["projects"] {
                        let repository_name = subJson["repository_name"].string
                        let repository_provider = subJson["repository_provider"].string
                        let repository_id = subJson["id"].number
                        var builds = Array<Build>()
                        for (_, buildJson) in subJson["builds"] {
                            let build = Build(_buildJson: buildJson)
                            builds.append(build)
                        }
                        if repository_name != nil && repository_provider != nil {
                            let project = Project(repository_id: repository_id! , repository_name: repository_name!, reporitory_provider: repository_provider!,builds: builds)
                            self.projects.append(project)
                        }
                    }
                    completionBlock(self.projects)
                case .Failure(let error):
                    print("Request failed with error: \(error)")
                }
        }
    }

    func getProject(project: Project, completionBlock: (Project!) -> ())  {
       if self.key == nil {
           return completionBlock(nil)
       }
       let idString = String(project.id)

       Alamofire.request(.GET, "https://codeship.com/api/v1/projects/" + idString + ".json", parameters: ["api_key": self.key])
           .responseJSON { response in
               switch response.result {
               case .Success(let data):
                   var projectJson = JSON(data)
                   let repository_name = projectJson["repository_name"].string
                   let repository_provider = projectJson["repository_provider"].string
                   let repository_id = projectJson["id"].number
                   var builds = Array<Build>()
                   for (_, buildJson) in projectJson["builds"] {
                       let build = Build(_buildJson: buildJson)
                       builds.append(build)
                   }
                   if repository_name != nil && repository_provider != nil {
                       let project = Project(repository_id: repository_id!, repository_name: repository_name!, reporitory_provider: repository_provider!,builds: builds)
                       completionBlock(project)
                   } else {
                       completionBlock(nil)
                   }
               case .Failure(let error):
                   print("Request failed with error: \(error)")
               }
       }
    }

}
