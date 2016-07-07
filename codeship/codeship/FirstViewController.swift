//
//  FirstViewController.swift
//  codeship
//
//  Created by Patrick Sullivan on 7/6/16.
//  Copyright © 2016 pdsullivan. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

    @IBOutlet weak var btnGoToBuilds: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func goToBuilds(sender: AnyObject) {
//        let buildsViewController = BuildsViewController()
        let vc = self.storyboard?.instantiateViewControllerWithIdentifier("BuildsViewController") as! BuildsViewController;
        self.presentViewController(vc, animated: true, completion: nil)
    }

}

