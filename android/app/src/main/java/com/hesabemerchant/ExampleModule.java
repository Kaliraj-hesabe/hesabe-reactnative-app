package com.hesabemerchant;

import static android.content.ContentValues.TAG;

import android.app.Activity;
import android.text.PrecomputedText;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.hesabemerchant.Utils.PrefManager;
import com.hesabemerchant.Utils.Utils;

import javax.annotation.Nonnull;

public class ExampleModule extends ReactContextBaseJavaModule {
    Activity activity;
    public ExampleModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Nonnull
    @Override
    public String getName() {
        return "ExampleModule";
    }

    
    @ReactMethod(isBlockingSynchronousMethod = false)
    public void MinimizeExample(String params) {
        activity = getCurrentActivity();
        Utils.ENABLE_FACELOGIN = params;
        PrefManager prefManager = new PrefManager(activity);
        prefManager.setFaceLoginEnabled(params);

        Log.i(TAG , "triggered by react native with params: " + params);
        //Toast.makeText(getReactApplicationContext(), "triggered by react native with params: " + params, Toast.LENGTH_LONG).show();
    }
}