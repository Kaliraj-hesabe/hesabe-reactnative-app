//
//  UserDefaults.swift
//  HesabeMerchant
//
//  Created by pramod yadav on 19/11/20.
//

import Foundation


extension UserDefaults{
  
  //MARK: Save Token
  func setTokenType(value: String) {
    set(value, forKey: UserDefaultsKeys.TokenType.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve Token
  func getTokenType()-> String {
    return string(forKey:UserDefaultsKeys.TokenType.rawValue)!
  }
  
  //MARK: Save Expires
  func setExpires(value: String) {
    set(value, forKey: UserDefaultsKeys.ExpiresIn.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve ExpiresTimer
  func getExpires()-> String {
    return string(forKey:UserDefaultsKeys.ExpiresIn.rawValue)!
  }
  
  //MARK: Save AccessToken
  func setAccessToken(value: String) {
    set(value, forKey: UserDefaultsKeys.AccessToken.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve Accesstoken
  func getAccessToken()-> String {
    return string(forKey: UserDefaultsKeys.AccessToken.rawValue)!
  }
  
  //MARK: Save Refreshtoken
  func setRefreshToken(value: String){
    set(value, forKey: UserDefaultsKeys.RefreshToken.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve Refreshtoken
  func getRefreshToken() -> String{
    return string(forKey:UserDefaultsKeys.RefreshToken.rawValue)!
  }
  
  //MARK: Save UserID
  func setUserId(value: String){
    set(value, forKey: UserDefaultsKeys.UserID.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve UserID
  func getUserId() -> String{
    return string(forKey:UserDefaultsKeys.UserID.rawValue)!
  }
  
  //MARK: Save Password
  func setPassword(value: String){
    set(value, forKey: UserDefaultsKeys.Password.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve Password
  func getPassword() -> String{
    return string(forKey:UserDefaultsKeys.Password.rawValue)!
  }
  
  //MARK: Save TooltipFlag
  func setToolTipFlag(value: String){
    set(value, forKey: UserDefaultsKeys.ToolTipSkip.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve TooltipFlag
  func getToolTipFlag() -> String{
    return string(forKey: UserDefaultsKeys.ToolTipSkip.rawValue)!
  }
  
  //MARK: Save Language
  func setselectLanguage(value: String){
    set(value, forKey: UserDefaultsKeys.Language.rawValue)
    //synchronize()
  }
  
  //MARK: Retrieve Language
  func getselectLanguage() -> String{
    return string(forKey: UserDefaultsKeys.Language.rawValue)!
  }
}

enum UserDefaultsKeys : String {
  case TokenType
  case ExpiresIn
  case AccessToken
  case RefreshToken
  case UserID
  case Password
  case Language
  case ToolTipSkip
}
