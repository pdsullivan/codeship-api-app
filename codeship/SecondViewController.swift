import UIKit

class SecondViewController: UIViewController {

    
    @IBOutlet weak var txtKey: UITextField!
    var api = CodeshipApi()
    
    @IBOutlet weak var btnSave: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        txtKey.text = api.key
//        btnSave.layer.cornerRadius = 0.5 * btnSave.bounds.size.width
    }

    @IBAction func btnSaveClick(sender: AnyObject) {
        api.key = txtKey.text
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


}

