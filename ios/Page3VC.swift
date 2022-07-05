//
//  Page1VC.swift
//  HesabeMerchant
//
//  Created by pramod yadav on 25/02/21.
//

import Foundation

class Page3VC: UIViewController{
  @IBOutlet weak var lblHeader1: UILabel!
  @IBOutlet weak var lblHeader2: UILabel!
  @IBOutlet weak var viewMain: UIView!
  
  override func viewDidLoad() {
  super.viewDidLoad()
    
    lblHeader1.text = "Reports".localized(UserDefaults.standard.getselectLanguage())
    lblHeader2.text = "View and download comprehensive reports".localized(UserDefaults.standard.getselectLanguage())
    lblHeader1.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
    lblHeader2.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
   
    
    
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
                viewMain.backgroundColor = Color.OrangeColor
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
