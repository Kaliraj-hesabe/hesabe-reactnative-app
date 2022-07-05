//
//  LoginViewController.swift
//  Sample
//
//  Created by pramod yadav on 11/08/20.
//

import UIKit
import IQKeyboardManagerSwift
import React
import Toast_Swift
import LocalAuthentication


struct Color {
    static var BlueColor = UIColor(red: 25/256, green: 8/256, blue: 101/256, alpha: 1.0)
    static var WhiteColor = UIColor(red: 255/256, green:255/256, blue: 255/256, alpha: 1.0)
    static var BlackColor = UIColor(red: 0/256, green:0/256, blue: 0/256, alpha: 1.0)
    static var OrangeColor = UIColor(red: 255/256, green:128/256, blue: 86/256, alpha: 1.0)
}

class LoginViewController: UIViewController,UITextFieldDelegate {
  
  @IBOutlet var loginview: UIView!
  @IBOutlet weak var checkEnglishButton: CheckBox!
  @IBOutlet weak var checkArabicButton: CheckBox!
  @IBOutlet weak var txtEmail: UITextField!
  @IBOutlet weak var txtPassword: UITextField!
  @IBOutlet weak var visibilityButton: UIButton!
  
  @IBOutlet var passEmailView: UIView!
  @IBOutlet var passView: UIView!
  @IBOutlet var userNameTextView: UIView!
  @IBOutlet var passwordTextView: UIView!
  @IBOutlet var  resetUserNameTextView: UIView!
  @IBOutlet var  passwordTokenTextView: UIView!
  @IBOutlet var  passwordPassTextView: UIView!
  @IBOutlet var  passwordNewTextView: UIView!
  
  @IBOutlet var  checkboxView: UIView!
  @IBOutlet var  resetButtonStackView: UIView!
  @IBOutlet var  passwordButtonStackView : UIView!
   
  
  @IBOutlet weak var txtCheckEmail: UITextField!
  @IBOutlet weak var txtEmailCode: UITextField!
  @IBOutlet weak var txtNewPassword: UITextField!
  @IBOutlet weak var txtConfirmPassword: UITextField!
  @IBOutlet weak var visibilityNewButton: UIButton!
  @IBOutlet weak var visibilityConfirmButton: UIButton!
  @IBOutlet weak var loginForgotButton: UIButton!
  @IBOutlet weak var loginButton: UIButton!
  @IBOutlet weak var resetCancelButton: UIButton!
  @IBOutlet weak var resetSubmitButton: UIButton!
  @IBOutlet weak var passwordCancelButton: UIButton!
  @IBOutlet weak var passwordSubmitButton: UIButton!
  
  @IBOutlet weak var loginHeader: UILabel!
  @IBOutlet weak var resetPasswordHeader: UILabel!
  @IBOutlet weak var passwordHeader: UILabel!
  @IBOutlet weak var checkEnglbl: UILabel!
  @IBOutlet weak var checkArabiclbl: UILabel!
  
  @IBOutlet weak var userHeightConstraint: NSLayoutConstraint!
  @IBOutlet weak var passwordHeightConstraint: NSLayoutConstraint!
  @IBOutlet weak var codeHeightConstraint: NSLayoutConstraint!
  @IBOutlet weak var newPassowrdHeightConstraint: NSLayoutConstraint!
  @IBOutlet weak var confirmPassowrdHeightConstraint: NSLayoutConstraint!
  
  var templang: String!
  
  //let BaseURl = "http://merchantapi.hesbstck.com/api/v1/" //development
  //let BaseURl =  "http://merchantapi2.hesbstck.com/api/v1/"  //developement2
  //let BaseURl = "http://merchantapisandbox.hesabe.com/api/v1/" //staging
  let BaseURl = "https://testmerchantapi.hesabe.com/api/v1/" //pre-production
  //let BaseURl = "https://merchantapi.hesabe.com/api/v1/" //Production
  
  
  var alert:UIAlertController!
  private var observer: NSObjectProtocol?
  
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    self.loginview!.roundedAllCorner()
    self.passEmailView!.roundedTopLeft()
    self.passEmailView!.roundedTopRight()
    self.passView!.roundedTopLeft()
    self.passView!.roundedTopRight()
    
    txtEmail.delegate = self
    txtPassword.delegate = self
    txtCheckEmail.delegate = self
    txtEmailCode.delegate = self
    txtNewPassword.delegate = self
    txtConfirmPassword.delegate = self
    IQKeyboardManager.shared.enable = true
    
    passEmailView.isHidden = true
    passView.isHidden = true
    
    if(UIScreen.main.nativeBounds.height <= 1136)
    {
    userHeightConstraint.constant = 15
    passwordHeightConstraint.constant = 15
    codeHeightConstraint.constant = 25
    newPassowrdHeightConstraint.constant = 25
    confirmPassowrdHeightConstraint.constant = 25
    }
    else
    {
      userHeightConstraint.constant = 40
      passwordHeightConstraint.constant = 40
      codeHeightConstraint.constant = 40
      newPassowrdHeightConstraint.constant = 40
      confirmPassowrdHeightConstraint.constant = 40
    }
    
    if(UIApplication.isFirstLaunch())
    {
      UserDefaults.standard.setToolTipFlag(value: "False")
    }
     
    
    if let str = UserDefaults.standard.string(forKey: "Language") {
      if(str == "ar")
      {
        templang = "ar"
         checkEnglishButton.isChecked = false
         checkArabicButton.isChecked = true
      }
      else
      {
        templang = "en"
         checkEnglishButton.isChecked = true
         checkArabicButton.isChecked = false
      }
     
       
    } else {
      
      let locale = NSLocale.current.languageCode
      templang =  locale == "ar" ?  "ar" : "en"
      checkEnglishButton.isChecked =  locale == "ar" ?  false : true
      checkArabicButton.isChecked =  locale == "ar" ?  true : false
      
    }
    
    
    if let facedatastr = UserDefaults.standard.string(forKey: "FaceData") {
      if(facedatastr == "true")
      {
        visibilityButton.setImage(UIImage(named: "face_id"), for: .normal)
      }
      else
      {
        visibilityButton.setImage(UIImage(named: "eyeLocked"), for: .normal)
      }
     
       
    } else {
      
      visibilityButton.setImage(UIImage(named: "eyeLocked"), for: .normal)
      
    }
   
   loadintialView()
    observer = NotificationCenter.default.addObserver(forName: UIApplication.willEnterForegroundNotification, object: nil, queue: .main) { [unowned self] notification in
                CheckUpdate.shared.showUpdate(withConfirmation: true)
            }
    
    if(hasJailbreak())
    {
      exit(0);
    }
    
    // Do any additional setup after loading the view.
  }
  
  override func viewWillAppear(_ animated: Bool) {
    CheckUpdate.shared.showUpdate(withConfirmation: true)
  }
  
  
  func loadintialView()
  {
    checkEnglbl.text = "English".localized(templang)
    checkArabiclbl.text = "Arabic".localized(templang)
    loginHeader.text = "Logintocontinue".localized(templang)
   
    txtEmail.placeholder = "Username".localized(templang)
    txtPassword.placeholder = "Password".localized(templang)
    loginForgotButton.setTitle(String(format: "%@",  "ForgotPassword".localized(templang)), for: .normal)
    
    loginButton.setTitle("Login".localized(templang), for: .normal)
    
    resetPasswordHeader.text = "PasswordReset".localized(templang)
    txtCheckEmail.placeholder = "Username".localized(templang)
    resetCancelButton.setTitle("Cancel".localized(templang), for: .normal)
    resetSubmitButton.setTitle("Submit".localized(templang), for: .normal)
    
    
    passwordHeader.text = "PasswordReset".localized(templang)
    txtEmailCode.placeholder = "Entersecretcodereceivedonemail".localized(templang)
    txtNewPassword.placeholder = "Enternewpassword".localized(templang)
    txtConfirmPassword.placeholder = "Confirmnewpassword".localized(templang)
    passwordCancelButton.setTitle("Cancel".localized(templang), for: .normal)
    passwordSubmitButton.setTitle("Submit".localized(templang), for: .normal)
    
    txtEmail.textAlignment =  templang == "ar" ? .right : .left
    txtPassword.textAlignment =  templang == "ar" ? .right : .left
    
    txtCheckEmail.textAlignment =  templang == "ar" ? .right : .left
    
    txtEmailCode.textAlignment =  templang == "ar" ? .right : .left
    txtNewPassword.textAlignment =  templang == "ar" ? .right : .left
    txtConfirmPassword.textAlignment =  templang == "ar" ? .right : .left
    
   
    self.loginview.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.userNameTextView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.passwordTextView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.checkboxView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    
    self.passEmailView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.resetUserNameTextView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.resetButtonStackView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    
    
    self.passView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.passwordTokenTextView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.passwordPassTextView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.passwordNewTextView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    self.passwordButtonStackView.semanticContentAttribute = templang == "ar" ? .forceRightToLeft : .forceLeftToRight
    
    
    loginHeader.textColor = isDarkMode ? Color.WhiteColor :  Color.BlueColor
    checkEnglbl.textColor = isDarkMode ? Color.WhiteColor :  Color.BlueColor
    checkArabiclbl.textColor = isDarkMode ? Color.WhiteColor :  Color.BlueColor
    resetPasswordHeader.textColor = isDarkMode ? Color.WhiteColor :  Color.BlueColor
    passwordHeader.textColor = isDarkMode ? Color.WhiteColor :  Color.BlueColor
    

    
  }
  
  
  @IBAction func CheckEnglishClick(_ sender: UIButton) {
    
    checkArabicButton.isChecked = false
    checkEnglishButton.isChecked = true
    templang = "en"
    loadintialView()
  }
  @IBAction func CheckArabicClick(_ sender: UIButton) {
    
    checkEnglishButton.isChecked = false
    checkArabicButton.isChecked = true
    templang = "ar"
    loadintialView()
    
  }
  
  
  @IBAction func ForgotPasswordClick(_ sender: UIButton) {
    
    passEmailView.isHidden = false
    passView.isHidden = true
    loginview.isHidden = true
     txtCheckEmail.text = ""
    
    
  }
  
  @IBAction func ForgotCancelClick(_ sender: UIButton) {
    passEmailView.isHidden = true
    passView.isHidden = true
    loginview.isHidden = false
    
  }
  
  @IBAction func ResetCancelClick(_ sender: UIButton) {
    
    passEmailView.isHidden = false
    passView.isHidden = true
    loginview.isHidden = true
    txtCheckEmail.text = ""
    
  }
  
  
  @IBAction func SubmitClick(_ sender: UIButton) {
    
    if(txtCheckEmail.text?.count != 0)
    {
      forgotApicall()
      
    }
    else
    {
      self.showToast(message: "Oops! That email is not valid".localized(templang))
    }
  }
  
  @IBAction func ResetPasswordClick(_ sender: UIButton) {
    
    if(txtEmailCode.text?.count != 0)
    {
      if(txtNewPassword.text == txtConfirmPassword.text && txtNewPassword.text!.count != 0)
      {
        resetPasswordApicall()
      }
      else
      {
        self.showToast(message: "Oops ! The password confirmation does not match".localized(templang))
      }
    }
    else
    {
      self.showToast(message: "Oops! code is empty".localized(templang))
    }
    
  }
  
  
  func biometric_Verification()
  {
    let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let reason = "Identify yourself!"

            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) {
                [weak self] success, authenticationError in

                DispatchQueue.main.async {
                    if success {
                       // self?.unlockSecretMessage()
                      print("LLL" + UserDefaults.standard.getUserId())
                      self!.loginApicall(Email: UserDefaults.standard.getUserId(),Password: UserDefaults.standard.getPassword(),refreshToken: UserDefaults.standard.getRefreshToken());
                      
                    } else {
                      let ac = UIAlertController(title: "Authentication failed", message: "You could not be verified; please try again.", preferredStyle: .alert)
                      ac.addAction(UIAlertAction(title: "OK", style: .default))
                      self?.present(ac, animated: true)
                    }
                }
            }
        } else {
          let ac = UIAlertController(title: "Biometry unavailable", message: "Your device is not configured for biometric authentication.", preferredStyle: .alert)
          ac.addAction(UIAlertAction(title: "OK", style: .default))
          self.present(ac, animated: true)
        }
  }
  
  func forgotApicall()
  {
    
    showActivityIndicatory()
    let params = ["merchantName":self.txtCheckEmail.text!] as Dictionary<String, String>
   
    var request = URLRequest(url: URL(string: "\(BaseURl)forgot")!)
    request.httpMethod = "POST"
    request.httpBody = try? JSONSerialization.data(withJSONObject: params, options: [])
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.addValue("application/json", forHTTPHeaderField: "Accept")
    
    let session = URLSession.shared
    let task = session.dataTask(with: request, completionHandler: { data, response, error -> Void in
      // print(response!)
      do {
        
        let jsonString = try JSONSerialization.jsonObject(with: data!) as! Dictionary<String, AnyObject>
        print(jsonString)
          print(params)
        
        
        DispatchQueue.main.async {
          if let jsonData = data
          {
            self.hideActivityIndicatory()
            let decodableResponse = try? JSONDecoder().decode(ForgotModel.self, from: jsonData)
            
            print("helo:\(decodableResponse?.status)")
            
            
            if(decodableResponse!.status)
            {
              self.passEmailView.isHidden = true
              self.passView.isHidden = false
              self.loginview.isHidden = true
              self.txtEmailCode.text = ""
              self.txtNewPassword.text = ""
              self.txtConfirmPassword.text = ""
              
            }
            else
            {
              self.hideActivityIndicatory()
              
              let str =  decodableResponse?.message ?? ""
               if(str.contains("We can't find a user.") || str.contains("Please contact support team."))
               {
                self.showToast(message:"This User doesn't exist in our system".localized(self.templang))
                }
                else{
                
                  self.showToast(message:str.localized(self.templang))
              }
             
            }
            
            
          } else {
            self.hideActivityIndicatory()
            self.showToast(message:"Oops! That email is not valid".localized(self.templang))
          }
          
          
          
        }
        
      } catch {
        self.hideActivityIndicatory()
        self.showToast(message:"Oops! That email is not valid".localized(self.templang))
        
        print("error")
      }
    })
    
    task.resume()
    
  }
  
  
  func resetPasswordApicall()
  {
    
    showActivityIndicatory()
    let params = [
      "token": txtEmailCode.text!,
      "merchantName": txtCheckEmail.text!,
      "password": txtNewPassword.text!,
      "password_confirmation": txtConfirmPassword.text!
      ] as Dictionary<String, String>
    
    var request = URLRequest(url: URL(string: "\(BaseURl)password/reset")!)
    request.httpMethod = "POST"
    request.httpBody = try? JSONSerialization.data(withJSONObject: params, options: [])
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.addValue("application/json", forHTTPHeaderField: "Accept")
    
    let session = URLSession.shared
    let task = session.dataTask(with: request, completionHandler: { data, response, error -> Void in
      //print(response!)
      do {
        
        let jsonString = try JSONSerialization.jsonObject(with: data!, options: []) as! Dictionary<String, Any>
        print(jsonString)
        print(jsonString["status"])
        
        DispatchQueue.main.async {
          if(jsonString["status"] as! Bool)
          {
            
            self.hideActivityIndicatory()
            self.showToast(message:(jsonString["message"]) as! String)
            self.passEmailView.isHidden = true
            self.passView.isHidden = true
            self.txtEmail.text = ""
            self.txtPassword.text = ""
            self.loginview.isHidden = false
          }
          else
          {
            self.hideActivityIndicatory()
            if(jsonString["response"] is NSNull )
            {
              
              self.showToast(message:((jsonString["message"]) as! String).localized(self.templang))
              
              
            }
            else
            {
              let decodableResponse = try? JSONDecoder().decode(ResetPassword.self, from: data!)
              if((decodableResponse?.response.password[0])! == "The password format is invalid.")
              {
                self.showToast(message:("Password Format: One Uppercase, One Lowercase, One Number and One symbol").localized(self.templang))
              }
              else
              {
              self.showToast(message:((decodableResponse?.response.password[0])!).localized(self.templang))
              }
            }
            
          }
        }
        
        
        /*DispatchQueue.main.async {
         if let jsonData = data
         {
         self.hideActivityIndicatory()
         let decodableResponse = try? JSONDecoder().decode(ResetPassword.self, from: jsonData)
         
         print("helo:\(decodableResponse?.status)")
         
         
         if(decodableResponse!.status)
         {
         self.passEmailView.isHidden = true
         self.passView.isHidden = true
         self.loginview.isHidden = false
         
         }
         else
         {
         self.hideActivityIndicatory()
         
         self.showToast(message:(decodableResponse?.response.password[0])!)
         
         /* if(decodableResponse?.response.password.decodeIfPresent != nil)
         {
         self.showToast(message:(decodableResponse?.response.password[0])!)
         }
         else
         {
         self.showToast(message:(decodableResponse?.message)!)
         }*/
         
         }
         
         
         } else {
         self.hideActivityIndicatory()
         self.showToast(message:"Oops! That email is not valid")
         }
         
         
         
         }*/
        
      } catch {
        self.hideActivityIndicatory()
        self.showToast(message:"Oops! That email is not valid".localized(self.templang))
        
        print("error")
      }
    })
    
    task.resume()
    
  }
  
  @IBAction func LoginClick(_ sender: UIButton) {
    
    if(txtEmail.text?.count != 0 && txtPassword.text?.count != 0)
    {
      showActivityIndicatory()
      var timer = 0.0
      if(UserDefaults.standard.getToolTipFlag() == "false")
      {
        timer = 10.0
      }
      DispatchQueue.main.asyncAfter(deadline: .now() + timer) {
        self.loginApicall(Email: self.txtEmail.text!,Password: self.txtPassword.text!,refreshToken:"");
      }
      
      
      
    }
    else
    {
      self.showToast(message:"Oops! That Username/Password combination is not valid.".localized(self.templang))
    }
    
    
    
  }
  
  func loginApicall( Email : String, Password : String, refreshToken : String)
  {
    var params : Dictionary<String, String>;
    var request : URLRequest;
   
    if(refreshToken.count != 0)
      {
        params = ["refreshToken":refreshToken] as Dictionary<String, String>
       print(params)
       
       request = URLRequest(url: URL(string: "\(BaseURl)token-refresh")!)
      }
      else
      {
        params = ["username":Email, "password":Password] as Dictionary<String, String>
       print(params)
       
       request = URLRequest(url: URL(string: "\(BaseURl)login")!)
      }
     
     
     
    request.httpMethod = "POST"
    request.httpBody = try? JSONSerialization.data(withJSONObject: params, options: [])
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.addValue("application/json", forHTTPHeaderField: "Accept")
    
    print(request)
    
    let session = URLSession.shared
    let task = session.dataTask(with: request, completionHandler: { data, response, error -> Void in
       print(response!)
      do {
        
        // let jsonString = try JSONSerialization.jsonObject(with: data!) as! Dictionary<String, AnyObject>
        
        
        
        DispatchQueue.main.async {
          if let jsonData = data
          {
            self.hideActivityIndicatory()
            let decodableResponse = try? JSONDecoder().decode(LoginModel.self, from: jsonData)
            if(decodableResponse != nil)
            {
              
              UserDefaults.standard.setAccessToken(value: decodableResponse?.response.token.accessToken ?? "")
              
              UserDefaults.standard.setExpires(value: String(format:"%d",   decodableResponse?.response.token.expiresIn ?? 0 ))
              
              UserDefaults.standard.setRefreshToken(value: decodableResponse?.response.token.refreshToken ?? "")
              
              UserDefaults.standard.setTokenType(value: decodableResponse?.response.token.tokenType ?? "")
              
              UserDefaults.standard.setUserId(value: Email)
              
              UserDefaults.standard.setPassword(value: "")
              
              UserDefaults.standard.setselectLanguage(value: self.templang == "ar" ? "ar" : "en")
              
              
              // print(UserDefaults.standard.getAccessToken())
              if(UserDefaults.standard.getToolTipFlag() == "True")
              {
                let appDelegate = UIApplication.shared.delegate as! AppDelegate
                
                
                appDelegate.go(toReactView:  UserDefaults.standard.getAccessToken(),UserDefaults.standard.getRefreshToken(), UserDefaults.standard.getExpires(),UserDefaults.standard.getTokenType(),UserDefaults.standard.getUserId(),UserDefaults.standard.getPassword(),UserDefaults.standard.getselectLanguage())
                
              }
              else
              {
                self.performSegue(withIdentifier: "PopView", sender: self)
              }
              
              
            }
            else
            {
              self.hideActivityIndicatory()
              self.showToast(message:"Oops! That Username/Password combination is not valid.".localized(self.templang))
            }
            //print(decodableResponse)
            
            
          } else {
            self.hideActivityIndicatory()
            self.showToast(message:"Oops! That Username/Password combination is not valid.".localized(self.templang))
          }
          
          
          
        }
        
      } catch {
        self.hideActivityIndicatory()
        self.showToast(message:"Oops! That Username/Password combination is not valid.".localized(self.templang))
        
        print("error")
      }
    })
    
    task.resume()
    
  }
  
  
  
  func showToast(message : String) {
    
    var style = ToastStyle()
               // style.messageFont = UIFont(name: "Zapfino", size: 14.0)!
                //style.messageColor = UIColor.red
                style.messageAlignment = .center
                style.backgroundColor = UIColor(red: (254/255.0), green: (89/255.0), blue: (111/255.0), alpha: 1.0)
    
    self.view.makeToast(message, duration: 1.0, position: .bottom, style: style)
    
    
   /* let toastLabel = UILabel(frame: CGRect(x: 10, y: UIScreen.main.bounds.size.height-100, width:  UIScreen.main.bounds.size.width-20, height: 60))
    toastLabel.backgroundColor = UIColor(red: (254/255.0), green: (89/255.0), blue: (111/255.0), alpha: 1.0)
    toastLabel.textColor = UIColor.white
    toastLabel.textAlignment = .center;
    toastLabel.lineBreakMode = NSLineBreakMode.byWordWrapping
    toastLabel.numberOfLines = 3
    toastLabel.font = UIFont(name: "Montserrat-Light", size: 15.0)
    toastLabel.text = message
    toastLabel.alpha = 1.0
    toastLabel.layer.cornerRadius = 10;
    toastLabel.clipsToBounds  =  true
    self.view.addSubview(toastLabel)
    UIView.animate(withDuration: 4.0, delay: 0.1, options: .curveEaseOut, animations: {
      toastLabel.alpha = 0.0
    }, completion: {(isCompleted) in
      toastLabel.removeFromSuperview()
    })*/
  }
  
  
  @IBAction func toggleSecureEntry(_ sender: UIButton) {
    
    var isSecureTextEntry :Bool = false
    var isFaceDataEnabled :Bool = false
    switch  sender.tag {
    case 1:
      if let facedatastr = UserDefaults.standard.string(forKey: "FaceData") {
        if(facedatastr == "true")
        {
          isFaceDataEnabled = true
          self.biometric_Verification();
        }
        else
        {
          isFaceDataEnabled = false
           isSecureTextEntry =  self.txtPassword.isSecureTextEntry
          self.txtPassword.isSecureTextEntry = isSecureTextEntry ? false : true
        }
       
         
      } else {
        isFaceDataEnabled = false
      isSecureTextEntry =  self.txtPassword.isSecureTextEntry
      self.txtPassword.isSecureTextEntry = isSecureTextEntry ? false : true
      }
      break
    case 2:
      isFaceDataEnabled = false
      isSecureTextEntry =  self.txtNewPassword.isSecureTextEntry
       self.txtNewPassword.isSecureTextEntry = isSecureTextEntry ? false : true
      break
    case 3:
      isFaceDataEnabled = false
      isSecureTextEntry =  self.txtConfirmPassword.isSecureTextEntry
       self.txtConfirmPassword.isSecureTextEntry = isSecureTextEntry ? false : true
      break
    default:
      break
    }
    
    if(isFaceDataEnabled == false)
    {
    if isSecureTextEntry {
      sender.setImage(UIImage(named: "eyeOpen"), for: .normal)
    } else {
      sender.setImage(UIImage(named: "eyeLocked"), for: .normal)
    }
    }
    
  }
  
  func textFieldShouldReturn(_ textField: UITextField) -> Bool {
    let nextTag = textField.tag + 1
    // Try to find next responder
    let nextResponder = textField.superview?.superview?.viewWithTag(nextTag) as UIResponder?
    
    if nextResponder != nil {
      // Found next responder, so set it
      nextResponder?.becomeFirstResponder()
    } else {
      // Not found, so remove keyboard
      textField.resignFirstResponder()
    }
    
    return false
  }
  
  
  
}


extension UIView{
  func roundedTopLeft(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.topLeft],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  
  func roundedTopRight(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.topRight],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  func roundedBottomLeft(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.bottomLeft],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  func roundedBottomRight(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.bottomRight],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  func roundedBottom(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.bottomRight , .bottomLeft],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  func roundedTop(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.topRight , .topLeft],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  func roundedLeft(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.topLeft , .bottomLeft],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  func roundedRight(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.topRight , .bottomRight],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  func roundedAllCorner(){
    let maskPath1 = UIBezierPath(roundedRect: bounds,
                                 byRoundingCorners: [.topRight , .bottomRight , .topLeft , .bottomLeft],
                                 cornerRadii: CGSize(width: 15, height: 15))
    let maskLayer1 = CAShapeLayer()
    maskLayer1.frame = bounds
    maskLayer1.path = maskPath1.cgPath
    layer.mask = maskLayer1
  }
  var isVisible: Bool {
         guard let _ = self.window else {
             return false
         }
         return true
     }
}

extension LoginViewController {
  var appDelegate: UIApplicationDelegate {
    guard let appDelegate = UIApplication.shared.delegate else {
      fatalError("Could not determine appDelegate.")
    }
    return appDelegate
  }
  
  func hasJailbreak() -> Bool {
      #if arch(i386) || arch(x86_64)
          print("Simulator")
          return false
      #else
          let fm = FileManager.default
    if(fm.fileExists(atPath: "/private/var/lib/apt")) || (fm.fileExists(atPath: "/Applications/Cydia.app"))
        {
              print("Jailbroken Device")
              return true
          } else {
              print("Clean Device")
              return false
          }
      #endif
  }
  
  
  func showActivityIndicatory() {
    let container: UIView = UIView()
    container.frame = self.view.frame
    container.center = self.view.center
    container.backgroundColor = UIColor.black.withAlphaComponent(0.5)
    
    let loadingView: UIView = UIView()
    loadingView.frame = CGRect(x: 0, y: 0, width: 80, height: 80)
    loadingView.center = self.view.center
    loadingView.backgroundColor = UIColor.black.withAlphaComponent(0.7)
    loadingView.clipsToBounds = true
    loadingView.layer.cornerRadius = 10
    
    let actInd: UIActivityIndicatorView = UIActivityIndicatorView()
    actInd.frame = CGRect(x: 0.0, y: 0.0, width: 40.0, height: 40.0);
    actInd.style =
       UIActivityIndicatorView.Style.whiteLarge
    actInd.center = CGPoint(x: loadingView.frame.size.width / 2,
                            y: loadingView.frame.size.height / 2);
    loadingView.addSubview(actInd)
    container.addSubview(loadingView)
    container.tag = 111
    self.view.addSubview(container)
    actInd.startAnimating()
  }
  
  func hideActivityIndicatory() {
    for loaderView in view.subviews {
      if let remove = loaderView.viewWithTag(111) {
        remove.removeFromSuperview()
      }
    }
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
                
                loginHeader.textColor =   Color.WhiteColor
                checkEnglbl.textColor =  Color.WhiteColor
                checkArabiclbl.textColor =  Color.WhiteColor
                resetPasswordHeader.textColor = Color.WhiteColor
                passwordHeader.textColor = Color.WhiteColor
                print("Dark");
              }
              else {
                
                loginHeader.textColor =  Color.BlueColor
                checkEnglbl.textColor =  Color.BlueColor
                checkArabiclbl.textColor = Color.BlueColor
                resetPasswordHeader.textColor = Color.BlueColor
                passwordHeader.textColor = Color.BlueColor
                print("Light");
                  //Light
              }
          }
      } else {
          // Fallback on earlier versions
      }
  }
  
}



extension String {
  func isValidEmail() -> Bool {
    // here, `try!` will always succeed because the pattern is valid
    let regex = try! NSRegularExpression(pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", options: .caseInsensitive)
    return regex.firstMatch(in: self, options: [], range: NSRange(location: 0, length: count)) != nil
  }
  
  func localized(_ lang:String) ->String {

      let path = Bundle.main.path(forResource: lang, ofType: "lproj")
      let bundle = Bundle(path: path!)

      return NSLocalizedString(self, tableName: nil, bundle: bundle!, value: "", comment: "")
  }
}


private var firstLaunch : Bool = false

extension UIApplication {

    static func isFirstLaunch() -> Bool {
        let firstLaunchFlag = "isFirstLaunchFlag"
      
         if(UserDefaults.standard.string(forKey: firstLaunchFlag) == nil)
         {
            firstLaunch = true
            UserDefaults.standard.set("false", forKey: firstLaunchFlag)
            UserDefaults.standard.synchronize()
        }
        else
         {
            firstLaunch = false
         }
        /*let isFirstLaunch = UserDefaults.standard.string(forKey: firstLaunchFlag) == nil
        if (isFirstLaunch) {
            firstLaunch = isFirstLaunch
            UserDefaults.standard.set("false", forKey: firstLaunchFlag)
            UserDefaults.standard.synchronize()
        }*/
        return firstLaunch
    }
}

