//
//  SkipBtn.swift
//  Sample
//
//  Created by pramod yadav on 13/08/20.
//

import UIKit

protocol SKipDelegate {
    func didPressButton(button:UIButton)
}
class SkipBtn: UIButton {

  
   var delegate:SKipDelegate!
  override func awakeFromNib() {
         self.addTarget(delegate, action:#selector(buttonClicked(sender:)), for: UIControl.Event.touchUpInside)
       self.setTitle("Skip".localized(UserDefaults.standard.getselectLanguage()), for: .normal)
     }
    
   @objc func buttonClicked(sender: UIButton) {
   
   // delegate.didPressButton(button: sender)
    
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
      UserDefaults.standard.setToolTipFlag(value: "True")
                 
    appDelegate.go(toReactView:  UserDefaults.standard.getAccessToken(),UserDefaults.standard.getRefreshToken(), UserDefaults.standard.getExpires(),UserDefaults.standard.getTokenType(),UserDefaults.standard.getUserId(),UserDefaults.standard.getPassword(),UserDefaults.standard.getselectLanguage())
    
   
    print("hello")
  }

}


extension UIApplication {
class func topViewController() -> UIViewController? {
    return UIApplication.topViewController(base: nil)
}
class func topViewController(base: UIViewController?) -> UIViewController? {
    var baseView = base
    if baseView == nil {
        baseView = (UIApplication.shared.delegate as? AppDelegate)?.window?.rootViewController
    }
    if let vc = baseView?.presentedViewController {
        return UIApplication.topViewController(base: vc)
    } else {
        return baseView;
    }
}
}


extension UIView {
    func traverseRadius(_ radius: Float) {
        layer.cornerRadius = CGFloat(radius)
     
        for subview: UIView in subviews {
            subview.traverseRadius(radius)
          
        
        }
    }
}


extension UIColor {
    public convenience init?(hex: String) {
        let r, g, b, a: CGFloat

        if hex.hasPrefix("#") {
            let start = hex.index(hex.startIndex, offsetBy: 1)
            let hexColor = String(hex[start...])

            if hexColor.count == 8 {
                let scanner = Scanner(string: hexColor)
                var hexNumber: UInt64 = 0

                if scanner.scanHexInt64(&hexNumber) {
                    r = CGFloat((hexNumber & 0xff000000) >> 24) / 255
                    g = CGFloat((hexNumber & 0x00ff0000) >> 16) / 255
                    b = CGFloat((hexNumber & 0x0000ff00) >> 8) / 255
                    a = CGFloat(hexNumber & 0x000000ff) / 255

                    self.init(red: r, green: g, blue: b, alpha: a)
                    return
                }
            }
        }

        return nil
    }
}
