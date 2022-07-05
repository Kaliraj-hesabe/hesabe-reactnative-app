//
//  ViewController.swift
//  elasticOnboard
//
//  Created by Anton Skopin on 28/12/2018.
//  Copyright © 2018 cuberto. All rights reserved.
//

import UIKit


class ColoredController: UIViewController {
  var viewColor: UIColor = .white {
    didSet {
      viewIfLoaded?.backgroundColor = viewColor
    }
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = viewColor
  }
}

class ViewController: LiquidSwipeContainerController, LiquidSwipeContainerDataSource,SKipDelegate {
  
  
  @IBOutlet var skipbtn: UIButton!
  
  
  var viewControllers: [UIViewController] = {
    let firstPageVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "page1")
    let secondPageVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "page2")
    let thirdPageVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "page3")
    let fourPageVC = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "page4")
    
    var controllers: [UIViewController] = [firstPageVC, secondPageVC,thirdPageVC,fourPageVC]
   
    return controllers
  }()
  
  
  
  override func viewDidLoad() {
    super.viewDidLoad()
    datasource = self
    
    
    let skipbtn = SkipBtn()
    skipbtn.delegate = self
    self.view.semanticContentAttribute  = .forceLeftToRight
  }
  
  func numberOfControllersInLiquidSwipeContainer(_ liquidSwipeContainer: LiquidSwipeContainerController) -> Int {
    return viewControllers.count
  }
  
  func liquidSwipeContainer(_ liquidSwipeContainer: LiquidSwipeContainerController, viewControllerAtIndex index: Int) -> UIViewController {
    return viewControllers[index]
  }
  
  func didPressButton(button: UIButton) {
    /* let vc = self.storyboard?.instantiateViewController(withIdentifier: "LoginViewController") as! LoginViewController
     vc.modalPresentationStyle = .fullScreen
     self.present(vc, animated: true, completion: nil)*/
    
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
     UserDefaults.standard.setToolTipFlag(value: "True")
    
    appDelegate.go(toReactView:  UserDefaults.standard.getAccessToken(),UserDefaults.standard.getRefreshToken(), UserDefaults.standard.getExpires(),UserDefaults.standard.getTokenType(),UserDefaults.standard.getUserId(),UserDefaults.standard.getPassword(),UserDefaults.standard.getselectLanguage())
  }
  
  
  
}


