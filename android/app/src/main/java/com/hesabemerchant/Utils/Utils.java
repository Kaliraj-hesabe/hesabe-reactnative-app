package com.hesabemerchant.Utils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.hesabemerchant.LoginActivity;

import java.util.Locale;
import java.util.concurrent.Executor;

import javax.annotation.Nonnull;

public class Utils {
    public static String ACCESS_TOKEN = null;
    public static String TOKEN_EXPIRY = "";
    public static String REFRESH_TOKEN = "";
    public static String TOKEN_TYPE = "";
    public static String Language = "en";
    public static String USER_NAME = "";
    public static String PASSWORD = "";
    public static String ENABLE_FACELOGIN = "";
    public static boolean InitialFlag = true;
    public static boolean IsTutorialShown = false;




    public static void setLanguage(@Nonnull Activity activity, @Nonnull Context context, @Nonnull String language) {
        PrefManager prefManager = new PrefManager(context);
        Locale locale = new Locale(language);
        Locale.setDefault(locale);
        prefManager.setLanguageName(language);
        Utils.Language = language;

        Resources resources = activity.getResources();
        Configuration configuration = resources.getConfiguration();
        configuration.setLocale(locale);
        activity.getBaseContext().getResources().updateConfiguration(configuration,
                activity.getBaseContext().getResources().getDisplayMetrics());

        resources.updateConfiguration(configuration, null);

        activity.finish();
        Intent intent = activity.getIntent();
        intent.putExtra("name","");
        activity.startActivity(intent);
    }


}
