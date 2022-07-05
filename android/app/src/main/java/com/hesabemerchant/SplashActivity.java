package com.hesabemerchant;

import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Bundle;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;

import com.hesabemerchant.Utils.PrefManager;
import com.hesabemerchant.Utils.Utils;

import java.util.Locale;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        PrefManager prefManager = new PrefManager(this);
        Utils.Language = prefManager.getLanguageName();
        Utils.USER_NAME = "";
        Utils.PASSWORD = "";
        initData();

        new Handler().postDelayed(() -> {
            Intent mainIntent = new Intent(SplashActivity.this, LoginActivity.class);
            startActivity(mainIntent);
            finish();
        }, 3000);
    }

    private void initData() {
        PrefManager prefManager = new PrefManager(this);
        Resources resources = getResources();
        Locale locale;
        String DeviceLang = Resources.getSystem().getConfiguration().locale.getLanguage();
        Utils.IsTutorialShown = prefManager.getTutorialShown();
        if (prefManager.isFirstTimeLaunch()) {
            if (DeviceLang.equalsIgnoreCase("ar")) {
                locale = new Locale("ar");
                Utils.Language = "ar";
            } else {
                locale = new Locale("en");
                Utils.Language = "en";
            }
        } else {
            locale = new Locale(Utils.Language);
        }
        prefManager.setLanguageName(Utils.Language);
        Utils.Language = prefManager.getLanguageName();
        Configuration configuration = resources.getConfiguration();
        configuration.setLocale(locale);
        Locale.setDefault(locale);
        resources.updateConfiguration(configuration, resources.getDisplayMetrics());
    }
}