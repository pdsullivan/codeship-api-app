//
//  Project.swift
//  codeship
//
//  Created by Patrick Sullivan on 7/12/16.
//  Copyright © 2016 pdsullivan. All rights reserved.
//

import Foundation

class Project  {
    
    let repositoryName, repositoryProvider: String
    
    
    init(repository_name: String, reporitory_provider: String) {
        self.repositoryName = repository_name
        self.repositoryProvider = reporitory_provider
    }
}