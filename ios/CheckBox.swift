//
//  CheckBox.swift
//  Sample
//
//  Created by pramod yadav on 12/08/20.
//


import Foundation
import UIKit


class CheckBox: UIButton {
    // Images
    let checkedImage = UIImage(named: "checkOval")! as UIImage
    let uncheckedImage = UIImage(named: "uncheckOval")! as UIImage

    // Bool property
    var isChecked: Bool = false {
        didSet {
            if isChecked == true {
              self.setImage(checkedImage, for: UIControl.State.normal)
            } else {
                self.setImage(uncheckedImage, for: UIControl.State.normal)
            }
        }
    }

    override func awakeFromNib() {
        self.addTarget(self, action:#selector(buttonClicked(sender:)), for: UIControl.Event.touchUpInside)
        self.isChecked = false
    }

    @objc func buttonClicked(sender: UIButton) {
        if sender == self {
            isChecked = true
        }
    }
}
