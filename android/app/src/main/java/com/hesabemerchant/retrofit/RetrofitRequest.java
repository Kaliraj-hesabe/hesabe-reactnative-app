package com.hesabemerchant.retrofit;

import android.content.Context;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitRequest {
    private static Retrofit retrofit;
    //public static final String BASE_URL = "http://merchantapi.hesbstck.com/api/v1/"; //develop1
    //public static final String BASE_URL = "http://merchantapi2.hesbstck.com/api/v1/"; //develop2
    //public static final String BASE_URL = "http://merchantapisandbox.hesabe.com/api/v1/"; //staging
    public static final String BASE_URL = "https://testmerchantapi.hesabe.com/api/v1/";  //pre-production
    //public static final String BASE_URL = "https://merchantapi.hesabe.com/api/v1/"; //production

    public static Retrofit getRetrofitInstance(Context context) {
        if (retrofit == null) {

            OkHttpClient.Builder oktHttpClient = new OkHttpClient.Builder()
                    .addInterceptor(new NetworkConnectionInterceptor(context));

            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(oktHttpClient.build())
                    .build();
        }
        return retrofit;
    }
}
