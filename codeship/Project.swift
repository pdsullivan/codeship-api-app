import Foundation

class Project  {
    
    let repositoryName, repositoryProvider: String
    var builds: Array<Build>
    
    init(repository_name: String, reporitory_provider: String, builds: Array<Build>) {
        self.repositoryName = repository_name
        self.repositoryProvider = reporitory_provider
        self.builds = builds
    }
}