//
//  ResetPassword.swift
//  HesabeMerchant
//
//  Created by pramod yadav on 04/01/21.
//

import Foundation

struct ResetPassword: Codable {
    let status: Bool
    let message: String
    let response: MetaData
  

}


  
// MARK: - Response
struct MetaData: Codable {
    let password: [String]
}

