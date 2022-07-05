//
//  LoginModel.h
//  HesabeMerchant
//
//  Created by pramod yadav on 27/10/20.
//

import Foundation

// MARK: - Welcome
struct LoginModel: Codable {
    let status: Bool
    let message: String
    let response: Response
}

// MARK: - Response
struct Response: Codable {
    let token: Token
}

// MARK: - Token
struct Token: Codable {
    let tokenType: String
    let expiresIn: Int
    let accessToken, refreshToken: String

    enum CodingKeys: String, CodingKey {
        case tokenType = "token_type"
        case expiresIn = "expires_in"
        case accessToken = "access_token"
        case refreshToken = "refresh_token"
    }
}

