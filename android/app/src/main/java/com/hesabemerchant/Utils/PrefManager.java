package com.hesabemerchant.Utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.hesabemerchant.entities.user.User;

public class PrefManager {
    private SharedPreferences pref;
    private SharedPreferences.Editor editor;
    private static final String IS_FIRST_TIME_LAUNCH = "IsFirstTimeLaunch";
    private static final String LanguageName = "LanguageName";
    private static final String  IS_FACE_ENABLE = "IsFaceEnable";
    private static final String TUTORIAL_SHOWN = "TutorialShown";
    private static final String USER_NAME = "UserName";
    private static final String PASSWORD = "password";
    private static final String REFRESH_TOKEN = "refreshtoken";

    @SuppressLint("CommitPrefEdits")
    public PrefManager(@NonNull Context context) {
        int PRIVATE_MODE = 0;
        String PREF_NAME = "HesabeMerchant";
        pref = context.getSharedPreferences(PREF_NAME, PRIVATE_MODE);
        editor = pref.edit();
    }

    public void setFirstTimeLaunch(boolean isFirstTime) {
        editor.putBoolean(IS_FIRST_TIME_LAUNCH, isFirstTime);
        editor.commit();
    }

    public boolean isFirstTimeLaunch() {
        return pref.getBoolean(IS_FIRST_TIME_LAUNCH, true);
    }

    public void setLanguageName(String languageName){
        editor.putString(LanguageName, languageName);
        editor.commit();
    }

    public String getLanguageName(){
        return pref.getString(LanguageName, "en");
    }

    public void setFaceLoginEnabled(String faceValue){
        editor.putString(IS_FACE_ENABLE, faceValue);
        editor.commit();
    }

    public String isFaceLoginEnabled(){
        return pref.getString(IS_FACE_ENABLE, "");
    }

    public void setTutorialShown(boolean isShown) {
        editor.putBoolean(TUTORIAL_SHOWN, isShown);
        editor.commit();
    }

    public boolean getTutorialShown() {
        return pref.getBoolean(TUTORIAL_SHOWN, false);
    }

    public void setUserDetails(String username, String password,String refreshToken) {
        editor.putString(USER_NAME, username);
        editor.putString(PASSWORD, password);
        editor.putString(REFRESH_TOKEN, refreshToken);
        editor.commit();
    }

    public User getUserInfo() {
        User user = new User();
        user.setUserName(pref.getString(USER_NAME, ""));
        user.setPassword(pref.getString(PASSWORD, ""));
        user.setRefreshToken(pref.getString(REFRESH_TOKEN, ""));
        return user;
    }
}
