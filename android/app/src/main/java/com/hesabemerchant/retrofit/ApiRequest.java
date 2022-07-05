package com.hesabemerchant.retrofit;


import com.hesabemerchant.entities.login.RefreshToken;
import com.hesabemerchant.entities.login.Token;
import com.hesabemerchant.entities.resetpassword.Reset;
import com.hesabemerchant.entities.login.Login;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiRequest {
    @Headers("Accept: application/json")
    @POST("login")
    Call<Login> login(
            @Body RequestBody params
    );

    @Headers("Accept: application/json")
    @POST("token-refresh")
    Call<RefreshToken> token_refresh(
            @Body RequestBody params
    );

    @Headers("Accept: application/json")
    @POST("forgot")
    Call<Reset> forgotPassword(
            @Query("merchantName") String merchantName
    );

    @Headers("Accept: application/json")
    @POST("password/reset")
    Call<Reset> resetPassword(
            @Query("token") String token,
            @Query("merchantName") String merchantName,
            @Query("password") String password,
            @Query("password_confirmation") String confirmPassword
    );

}
