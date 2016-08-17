import UIKit

class SecondViewController: UIViewController {

    @IBOutlet weak var txtKey: UITextField!

    var api = CodeshipApi()

    @IBOutlet weak var btnSave: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        txtKey.text = api.key
    }

    @IBAction func btnSaveClick(sender: AnyObject) {
        api.key = txtKey.text
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


}
