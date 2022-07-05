package com.hesabemerchant.fragments;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.NonNull;

import com.hesabemerchant.R;
import com.hesabemerchant.entities.resetpassword.Reset;
import com.hesabemerchant.retrofit.ApiRequest;
import com.hesabemerchant.retrofit.RetrofitRequest;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ForgotPassword extends Base {

    private Activity activity;
    private Context context;
    EditText etUserName;
    private String userName;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_forgot_password, container, false);
        activity = getActivity();
        context = getContext();
        if (activity != null) {
            etUserName = view.findViewById(R.id.et_user_name);
            Button btnSubmit = view.findViewById(R.id.btn_submit);
            Button btnCancel = view.findViewById(R.id.btn_cancel);
            btnSubmit.setOnClickListener(v -> {
                userName = etUserName.getText().toString();
                if (userName == null || userName.isEmpty()) {
                    toast(context, getString(R.string.invalid_email));
                } else {
                    confirmUserName();
                }
            });

            btnCancel.setOnClickListener(v -> activity.onBackPressed());
        }
        return view;
    }

    private void confirmUserName() {
        showProgress(activity);
        ApiRequest service = RetrofitRequest.getRetrofitInstance(context).create(ApiRequest.class);
        Call<Reset> call = service.forgotPassword(userName);
        call.enqueue(new Callback<Reset>() {
            @Override
            public void onResponse(@NonNull Call<Reset> call, @NonNull Response<Reset> response) {
                hideProgress(activity);
                if (response.body() != null) {
                    initResponse(response.body());
                } else {
                    try {
                        JSONObject jObjError;
                        if (response.errorBody() != null) {
                            jObjError = new JSONObject(response.errorBody().string());

                            if(jObjError.getString("message").contains("We can't find a user.") || jObjError.getString("message").contains("Please contact support team."))
                            {

                                toast(context, getString(R.string.forgoterror));
                            }
                            else{
                                toast(context, jObjError.getString("message"));
                            }


                        }
                    } catch (Exception e){
                        e.printStackTrace();
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

    private void initResponse(Reset reset) {
        if (reset.getStatus()) {
            Bundle args = new Bundle();
            args.putString("username", userName);
            initFragment(new ResetPassword(), args);
            etUserName.getText().clear();
        }
        else {
            toast(context, getString(R.string.invalid_email));
        }

    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
    }
}