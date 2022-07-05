//
//  LastViewController.swift
//  Sample
//
//  Created by pramod yadav on 11/08/20.
//

import UIKit

class LastViewController: UIViewController {
  
  @IBOutlet weak var lblHeader1: UILabel!
  @IBOutlet weak var lblHeader2: UILabel!
  @IBOutlet weak var btntitle: UIButton!
  @IBOutlet weak var viewMain: UIView!

    override func viewDidLoad() {
        super.viewDidLoad()

    lblHeader1.text = "Share Invoice".localized(UserDefaults.standard.getselectLanguage())
    lblHeader2.text = "Share invoices via SMS, WhatsApp, Email, Link and QR Code".localized(UserDefaults.standard.getselectLanguage())
      btntitle.setTitle("Get Started".localized(UserDefaults.standard.getselectLanguage()), for: .normal)
      
      lblHeader1.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
      lblHeader2.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
        // Do any additional setup after loading the view.
    }
    
    @IBAction func GetStartedClick(_ sender: Any)
    {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
                     
          UserDefaults.standard.setToolTipFlag(value: "True")
      appDelegate.go(toReactView:  UserDefaults.standard.getAccessToken(),UserDefaults.standard.getRefreshToken(), UserDefaults.standard.getExpires(),UserDefaults.standard.getTokenType(),UserDefaults.standard.getUserId(),UserDefaults.standard.getPassword(),UserDefaults.standard.getselectLanguage())
    }
    
  
  var isDarkMode: Bool {
          if #available(iOS 13.0, *) {
              return self.traitCollection.userInterfaceStyle == .dark
          }
          else {
              return false
          }
      }
  
  override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
      super.traitCollectionDidChange(previousTraitCollection)

      if #available(iOS 13.0, *) {
          if self.traitCollection.hasDifferentColorAppearance(comparedTo: previousTraitCollection) {
              if traitCollection.userInterfaceStyle == .dark {
                  //Dark
                
                lblHeader1.textColor =   Color.WhiteColor
                lblHeader2.textColor =  Color.WhiteColor
                viewMain.backgroundColor = Color.WhiteColor
                print("Dark");
              }
              else {
                
                lblHeader1.textColor =   Color.BlueColor
                lblHeader2.textColor =  Color.BlueColor
                viewMain.backgroundColor = Color.BlackColor
                print("Light");
                  //Light
              }
          }
      } else {
          // Fallback on earlier versions
      }
  }

}
