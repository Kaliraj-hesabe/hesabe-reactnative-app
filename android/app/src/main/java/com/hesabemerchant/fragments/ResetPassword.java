package com.hesabemerchant.fragments;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.NonNull;

import com.google.gson.Gson;
import com.hesabemerchant.R;
import com.hesabemerchant.entities.api_error.ErrorResponse;
import com.hesabemerchant.entities.resetpassword.Reset;
import com.hesabemerchant.retrofit.ApiRequest;
import com.hesabemerchant.retrofit.RetrofitRequest;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ResetPassword extends Base {

    private Activity activity;
    private Context context;
    private String secretCode, newPassword, confirmPassword, merchantName;
    EditText etSecretCode, etPassword, etConfirmPassword;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_reset_password, container, false);
        activity = getActivity();
        context = getContext();
        if (activity != null) {
            if (getArguments() != null) {
                merchantName = getArguments().getString("username");
            }
            etSecretCode = view.findViewById(R.id.et_secret_code);
            etPassword = view.findViewById(R.id.et_password);
            etConfirmPassword = view.findViewById(R.id.et_confirm_password);
            Button btnResetPassword = view.findViewById(R.id.btn_resetPassword);
            Button btnCancel = view.findViewById(R.id.btn_cancel);
            btnResetPassword.setOnClickListener(v -> {
                if (isValid()) {
                    resetPassword();
                }
            });
            btnCancel.setOnClickListener(v -> activity.onBackPressed());
        }
        return view;
    }

    private boolean isValid() {
        secretCode = etSecretCode.getText().toString();
        newPassword = etPassword.getText().toString();
        confirmPassword = etConfirmPassword.getText().toString();
        if (secretCode == null || secretCode.isEmpty()) {
            toast(context, getString(R.string.oops_code_is_empty));
            return false;
        } else if (newPassword == null || newPassword.isEmpty()) {
            toast(context, getString(R.string.password_does_not_matched));
            return false;
        } else if (confirmPassword == null || confirmPassword.isEmpty()) {
            toast(context, getString(R.string.password_does_not_matched));
            return false;
        } else if (!newPassword.equals(confirmPassword)) {
            toast(context, getString(R.string.password_does_not_matched));
            return false;
        }
        return true;
    }

    private void resetPassword(){
        showProgress(activity);
        ApiRequest service = RetrofitRequest.getRetrofitInstance(context).create(ApiRequest.class);
        Call<Reset> call = service.resetPassword(secretCode, merchantName, newPassword, confirmPassword);
        call.enqueue(new Callback<Reset>() {
            @Override
            public void onResponse(@NonNull Call<Reset> call, @NonNull Response<Reset> response) {
                hideProgress(activity);
                if (response.body() != null) {
                    initResponse(response.body());
                } else {
                    try {
                        /*JSONObject jObjError;
                        if (response.errorBody() != null) {
                            jObjError = new JSONObject(response.errorBody().string());
                            toast(context, jObjError.getString("message"));
                        }*/

                        if (response.errorBody() != null) {
                            ErrorResponse errorjson = new Gson().fromJson(response.errorBody().charStream(), ErrorResponse.class);
                            String errorMsg = errorjson.getResponse().getPassword().get(0);
                            if(errorMsg != null && !errorMsg.isEmpty()) {
                                if (errorMsg.equalsIgnoreCase("The password format is invalid.")) {
                                    toast(context, getString(R.string.password_format_case) );
                                } else {
                                    toast(context, errorjson.getResponse().getPassword().get(0));
                                }
                            }
                            else
                            {
                                toast(context,getString(R.string.invalid_response));
                            }

                        }
                    } catch (Exception e){
                        e.printStackTrace();
                        toast(context,getString(R.string.invalid_response));
                    }
                }
            }

            @Override
            public void onFailure(@NonNull Call<Reset> call, @NonNull Throwable t) {
                hideProgress(activity);
                toast(context, t.getMessage());
            }
        });
    }

    private void initResponse(Reset resetPassword) {
        if (resetPassword.getStatus()) {
            initFragment(new UserLogin(), null);
            etSecretCode.getText().clear();
            etPassword.getText().clear();
            etConfirmPassword.getText().clear();
        }
        toast(context, resetPassword.getMessage());
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
    }
}