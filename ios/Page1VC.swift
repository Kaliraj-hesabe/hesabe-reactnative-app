//
//  Page1VC.swift
//  HesabeMerchant
//
//  Created by pramod yadav on 25/02/21.
//

import Foundation
import UIKit

class Page1VC: UIViewController{
  
  @IBOutlet weak var lblHeader1: UILabel!
  @IBOutlet weak var lblHeader2: UILabel!
  @IBOutlet weak var viewMain: UIView!
  
  override func viewDidLoad() {
  super.viewDidLoad()
    
   lblHeader1.text = "Quick Invoice".localized(UserDefaults.standard.getselectLanguage())
   lblHeader2.text = "Send an Invoice in 3 easy steps".localized(UserDefaults.standard.getselectLanguage())
   lblHeader1.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
   lblHeader2.textColor =  isDarkMode ? Color.WhiteColor : Color.BlueColor
   viewMain.backgroundColor =  isDarkMode ? Color.BlackColor : Color.WhiteColor
    
    
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
                viewMain.backgroundColor = Color.BlackColor
               
                print("Dark");
              }
              else {
                
                lblHeader1.textColor =  Color.BlueColor
                lblHeader1.textColor =  Color.BlueColor
                viewMain.backgroundColor = Color.WhiteColor
               
                  //Light
              }
          }
      } else {
          // Fallback on earlier versions
      }
  }
  
}
