package com.hesabemerchant;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.hesabemerchant.Utils.Utils;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */

    @Override
    protected String getMainComponentName() {

        return "HesabeMerchant";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Utils.InitialFlag) {
            sampee();
        }
        
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected Bundle getLaunchOptions() {
                Bundle initialProperties = new Bundle();
                initialProperties.putString("LoginToken", Utils.ACCESS_TOKEN);
                initialProperties.putString("LoginRefreshToken", Utils.REFRESH_TOKEN);
                initialProperties.putString("LoginTokenExpires", Utils.TOKEN_EXPIRY);
                initialProperties.putString("LoginTokenType", Utils.TOKEN_TYPE);
                initialProperties.putString("CurrentLanguage", Utils.Language);

                return initialProperties;
            }

            @Override
            protected ReactRootView createRootView() {
                      return new RNGestureHandlerEnabledRootView(MainActivity.this);
                      }
        };
    }

    private void sampee() {
        Utils.InitialFlag = false;
        Intent fg = new Intent(this, SplashActivity.class);
        startActivity(fg);
    }
}
