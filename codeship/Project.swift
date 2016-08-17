import Foundation

class Project  {

    let repositoryName, repositoryProvider: String
    let id: NSNumber
    var builds: Array<Build>

    init(repository_id: NSNumber, repository_name: String, reporitory_provider: String, builds: Array<Build>) {
        self.id = repository_id
        self.repositoryName = repository_name
        self.repositoryProvider = reporitory_provider
        self.builds = builds
    }
}
