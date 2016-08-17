import UIKit

class SecondViewController: UIViewController {

    @IBOutlet weak var txtKey: UITextField!

    var api = CodeshipApi()

    @IBOutlet weak var btnSave: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        txtKey.text = api.key
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
    }
    
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    @IBAction func btnSaveClick(sender: AnyObject) {
        api.key = txtKey.text
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


}
