//
//  Page1VC.swift
//  HesabeMerchant
//
//  Created by pramod yadav on 25/02/21.
//

import Foundation

class Page2VC: UIViewController{
  @IBOutlet weak var lblHeader1: UILabel!
  @IBOutlet weak var lblHeader2: UILabel!
  @IBOutlet weak var viewMain: UIView!
  
  override func viewDidLoad() {
  super.viewDidLoad()
    
    lblHeader1.text = "Open Invoice".localized(UserDefaults.standard.getselectLanguage())
    lblHeader2.text = "Create an Invoice with Fixed or Open amounts and share via QR code".localized(UserDefaults.standard.getselectLanguage())
    
    
    
  }
  
  override func viewWillAppear(_ animated: Bool) {
    
    lblHeader1.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
    lblHeader2.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
    //let pagervc = Page2VC()
    
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
                viewMain.backgroundColor = Color.BlueColor
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

