package com.hesabemerchant;

import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;
import com.google.android.play.core.tasks.Task;
import com.hesabemerchant.Utils.Utils;
import com.hesabemerchant.fragments.UserLogin;

import java.io.File;
import java.util.concurrent.Executor;

public class LoginActivity extends AppCompatActivity {




    private static final int REQUEST_CODE = 111;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        checkUpdate();
        if (isRooted()) {
            finishAffinity();
            System.exit(0);
            Log.i("demo","Device Rooted");

        } else {
            Log.i("demo","Device Not Rooted");
        }
            String AppLang = getIntent().getStringExtra("name");
            if(AppLang != null && !AppLang.isEmpty())
            {
                if(!Utils.Language.equalsIgnoreCase(AppLang) ) {

                    Utils.setLanguage(this, this, AppLang);
                }

            }

        setMainFragment(new UserLogin());


    }



    private void setMainFragment(Fragment fragment) {
        FragmentManager frgManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = frgManager.beginTransaction();
        fragmentTransaction.add(R.id.main_frame_layout, fragment).commit();
        frgManager.executePendingTransactions();
    }

    public  boolean findBinary(String binaryName) {
        boolean found = false;
        if (!found) {
            String[] places = { "/sbin/", "/system/bin/", "/system/xbin/",
                    "/data/local/xbin/", "/data/local/bin/",
                    "/system/sd/xbin/", "/system/bin/failsafe/", "/data/local/" };
            for (String where : places) {
                if (new File(where + binaryName).exists()) {
                    found = true;

                    break;
                }
            }
        }
        return found;
    }

    private  boolean isRooted() {
        return findBinary("su");
    }

    private void checkUpdate() {
        AppUpdateManager appUpdateManager = AppUpdateManagerFactory.create(this);
        Task<AppUpdateInfo> appUpdateInfoTask = appUpdateManager.getAppUpdateInfo();
        appUpdateInfoTask.addOnSuccessListener(appUpdateInfo -> {
            try {
                if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE) {
                    appUpdateManager.startUpdateFlowForResult(appUpdateInfo, AppUpdateType.IMMEDIATE, this, REQUEST_CODE);
                }
            } catch (Exception e){
                e.printStackTrace();
            }
        });

        appUpdateInfoTask.addOnFailureListener(e -> e.printStackTrace());
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == REQUEST_CODE) {
            if (resultCode != RESULT_OK) {
                checkUpdate();
            }
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    }

