package com.hesabemerchant.fragments;

import static android.content.ContentValues.TAG;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.google.android.material.textfield.TextInputLayout;
import com.hesabemerchant.R;
import com.hesabemerchant.Utils.PrefManager;
import com.hesabemerchant.Utils.Utils;
import com.hesabemerchant.WelcomeActivity;
import com.hesabemerchant.entities.login.Login;
import com.hesabemerchant.entities.login.RefreshToken;
import com.hesabemerchant.entities.login.Token;
import com.hesabemerchant.entities.user.User;
import com.hesabemerchant.retrofit.ApiRequest;
import com.hesabemerchant.retrofit.RetrofitRequest;

import java.util.concurrent.Executor;

import javax.annotation.Nonnull;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class UserLogin extends Base {

    private RadioGroup rgLanguage;

    private Activity activity;
    private Context context;
    EditText etEmail, etPassword;
    private String email, password, lang;
    private boolean doubleBackToExitPressedOnce = false;
    PrefManager prefManager;
    private static BiometricPrompt biometricPrompt;
    private static BiometricPrompt.PromptInfo promptInfo;
    private TextInputLayout etPasswordLayout;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_user_login, container, false);
        activity = getActivity();
        context = getContext();


        if (activity != null && context != null) {
            bimotericCheck();
            prefManager = new PrefManager(context);
            Utils.IsTutorialShown = prefManager.getTutorialShown();

            etPasswordLayout = view.findViewById(R.id.etPasswordLayout);
            etEmail = view.findViewById(R.id.et_email);
            etPassword = view.findViewById(R.id.et_Password_Layout);
            rgLanguage = view.findViewById(R.id.rbg_language);

            Button btnLogin = view.findViewById(R.id.btn_login);
            btnLogin.setOnClickListener(v -> {
                if (isValidData())
                    login(email,password);
            });

            Log.i(TAG , "FACELIKE1 :" + prefManager.isFaceLoginEnabled());
            if(prefManager.isFaceLoginEnabled().equals( "true")) {
                //toast(context, prefManager.isFaceLoginEnabled());
                Log.i(TAG , "FACELIKE2 :" + prefManager.isFaceLoginEnabled());
                etPasswordLayout.setEndIconDrawable(R.drawable.face_id);
                etPasswordLayout.setEndIconOnClickListener(v -> faceAuth());
            }
            TextView tvForgotPassword = view.findViewById(R.id.tv_forgot_password);
            tvForgotPassword.setOnClickListener(v -> initFragment(new ForgotPassword(), null));
            //tvForgotPassword.setOnClickListener(v -> Utils.faceAuth(context));
            initRadioGroup();
            initEditTexts();

        }

        return view;
    }


    private void initRadioGroup() {
        if (!Utils.Language.isEmpty()) {
            RadioButton radioButton = rgLanguage.findViewWithTag(Utils.Language);
            if (radioButton != null)
                radioButton.setChecked(true);
        }

        rgLanguage.setOnCheckedChangeListener((group, i) -> {
            int checkedId = group.getCheckedRadioButtonId();
            if (checkedId > 0) {
                RadioButton radioButton = group.findViewById(checkedId);
                lang = (String) radioButton.getTag();
                if (!lang.equalsIgnoreCase(Utils.Language))
                    Utils.setLanguage(activity, context, lang);
            }
        });
    }

    private boolean isValidData() {
        email = etEmail.getText().toString();
        password = etPassword.getText().toString();
        if ((email == null || email.isEmpty()) || (password == null || password.isEmpty())) {
            toast(context, getString(R.string.incorrect_creds));
            return false;
        }
        return true;
    }

    private void initEditTexts() {
        if (Utils.USER_NAME != null && !Utils.USER_NAME.isEmpty()) {
            etEmail.setText(Utils.USER_NAME);
        }
        if (Utils.PASSWORD != null && !Utils.PASSWORD.isEmpty()) {
            etPassword.setText(Utils.PASSWORD);
        }

        etEmail.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                Utils.USER_NAME = s.toString();
            }
        });

        etPassword.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                Utils.PASSWORD = s.toString();
            }
        });
    }

    public void login(String email,String password) {
        showProgress(activity);
        RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
                .addFormDataPart("username", email)
                .addFormDataPart("password", password)
                .build();
        ApiRequest service = RetrofitRequest.getRetrofitInstance(context).create(ApiRequest.class);
        Call<Login> call = service.login(body);
        call.enqueue(new Callback<Login>() {
            @Override
            public void onResponse(@NonNull Call<Login> call, @NonNull Response<Login> response) {
                hideProgress(activity);
                if (response.body() != null) {
                    loginResponse(response.body());
                } else {
                    toast(context, getString(R.string.incorrect_creds));
                }
            }

            @Override
            public void onFailure(@NonNull Call<Login> call, @NonNull Throwable t) {
                hideProgress(activity);
                toast(context, t.getMessage());
            }
        });
    }

    public void token_login(String refreshToken) {
        showProgress(activity);
        //toast(context,refreshToken);
       // Log.i(TAG , "RRRR :" + refreshToken);
        RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
                .addFormDataPart("refreshToken", refreshToken)
                .build();
        ApiRequest service = RetrofitRequest.getRetrofitInstance(context).create(ApiRequest.class);
        Call<RefreshToken> call = service.token_refresh(body);
        call.enqueue(new Callback<RefreshToken>() {
            @Override
            public void onResponse(@NonNull Call<RefreshToken> call, @NonNull Response<RefreshToken> response) {
                hideProgress(activity);
                if (response.body() != null) {
                    tokenResponse(response.body());
                } else {
                    toast(context, getString(R.string.incorrect_creds));
                }
            }

            @Override
            public void onFailure(@NonNull Call<RefreshToken> call, @NonNull Throwable t) {
                hideProgress(activity);
                toast(context, t.getMessage());
            }
        });
    }

    private void tokenResponse(RefreshToken refreshToken) {
        try {
            if (refreshToken.getStatus()) {
                if (refreshToken.getResponse().getToken() != null) {


                    Token token = refreshToken.getResponse().getToken();
                    Log.d("myTag", token.getAccessToken());
                    Utils.ACCESS_TOKEN = token.getAccessToken();
                    Utils.REFRESH_TOKEN = token.getRefreshToken();
                    Utils.TOKEN_EXPIRY = token.getExpiresIn();
                    Utils.TOKEN_TYPE = token.getTokenType();
                    prefManager.setUserDetails(Utils.USER_NAME, Utils.PASSWORD,Utils.REFRESH_TOKEN);
                    Utils.USER_NAME = "";
                    Utils.PASSWORD = "";

                    if (!Utils.IsTutorialShown) {
                        Intent mainIntent = new Intent(activity, WelcomeActivity.class);
                        startActivity(mainIntent);
                        if (activity != null)
                            activity.finish();
                    } else {
                        navigateToWelcome();

                    }
                } else {
                    toast(context, getString(R.string.incorrect_creds));
                }
            } else {
                toast(context, getString(R.string.incorrect_creds));
            }
        }catch(Exception e){
            Toast.makeText(activity, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void loginResponse(Login login) {
        try {
            if (login.getStatus()) {
                if (login.getResponse().getToken() != null) {


                    Token token = login.getResponse().getToken();
                     Log.d("myTag", token.getAccessToken());
                    Utils.ACCESS_TOKEN = token.getAccessToken();
                    Utils.REFRESH_TOKEN = token.getRefreshToken();
                    Utils.TOKEN_EXPIRY = token.getExpiresIn();
                    Utils.TOKEN_TYPE = token.getTokenType();
                    prefManager.setUserDetails(Utils.USER_NAME, Utils.PASSWORD,Utils.REFRESH_TOKEN);
                    Utils.USER_NAME = "";
                    Utils.PASSWORD = "";

                    if (!Utils.IsTutorialShown) {
                        Intent mainIntent = new Intent(activity, WelcomeActivity.class);
                        startActivity(mainIntent);
                        if (activity != null)
                            activity.finish();
                    } else {
                        navigateToWelcome();

                    }
                } else {
                    toast(context, getString(R.string.incorrect_creds));
                }
            } else {
                toast(context, getString(R.string.incorrect_creds));
            }
        }catch(Exception e){
            Toast.makeText(activity, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }


    private void onBackPressed() {
        if (!doubleBackToExitPressedOnce) {
            doubleBackToExitPressedOnce = true;
            toast(context, getString(R.string.press_back_again));
            new Handler().postDelayed(() -> doubleBackToExitPressedOnce = false, 2000);
        } else {
            if (activity != null) {
                Utils.USER_NAME = "";
                Utils.PASSWORD = "";
                activity.finishAffinity();
                System.exit(0);
            }
        }
    }

    public void bimotericCheck()
    {

        //if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {

        Executor executor = ContextCompat.getMainExecutor(context);
        biometricPrompt = new BiometricPrompt((FragmentActivity) activity,
                executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode,
                                              @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);

                // showErrorDialog(getString(R.string.authenticate_error));
                // Log.i(TAG, errString);
                toast(context, errString.toString());

            }

            @Override
            public void onAuthenticationSucceeded(
                    @NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);

                User user = prefManager.getUserInfo();
                Utils.USER_NAME = user.getUserName();
                Utils.PASSWORD = user.getPassword();
                Utils.REFRESH_TOKEN = user.getRefreshToken();
                token_login(Utils.REFRESH_TOKEN);
            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                toast(context, "Authentication failed"
                        );

            }
        });

        promptInfo = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric login for my app")
                .setSubtitle("Log in using your biometric credential")
                .setNegativeButtonText("Use account password")
                .build();

        // }


    }

    public void faceAuth() {
        biometricPrompt.authenticate(promptInfo);
        /*if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q)
            biometricPrompt.authenticate(promptInfo);
        else
            Toast.makeText(context, "Authentication failed",
                    Toast.LENGTH_SHORT)
                    .show();*/

    }
    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
    }

    @Override
    public void onResume() {
        super.onResume();
        if (getView() != null) {
            getView().setFocusableInTouchMode(true);
            getView().requestFocus();
            getView().setOnKeyListener((v, keyCode, event) -> {
                if (event.getAction() == KeyEvent.ACTION_UP && keyCode == KeyEvent.KEYCODE_BACK) {
                    onBackPressed();
                    return true;
                }
                return false;
            });
        }
    }
}