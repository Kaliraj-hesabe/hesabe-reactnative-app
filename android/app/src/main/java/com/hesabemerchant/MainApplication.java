package com.hesabemerchant;

import android.app.Application;
import android.app.NotificationManager;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.reactNativeQuickActions.AppShortcutsPackage;
//import com.reactNativeQuickActions.AppShortcutsPackage;
import com.openNativeScreen.OpenNativeScreenPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import com.oblador.keychain.KeychainPackage;
import com.gevorg.reactlibrary.RNQrGeneratorPackage;
import io.realm.react.RealmReactPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.reactNativeQuickActions.AppShortcutsPackage;
//import com.skyward.NotificationManager.NotificationManager;





public class MainApplication extends Application implements ReactApplication {


  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }


        @Override
        protected List<ReactPackage> getPackages() {
          //@SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
             new KeychainPackage();
            new ActivityStarterReactPackage(); // This is it!
             new MainReactPackage();
            new AppShortcutsPackage();
            new NetInfoPackage();
            new CameraRollPackage();
             new RNQrGeneratorPackage();
             new RealmReactPackage();
             new RNFSPackage();
            new OpenNativeScreenPackage();
            new AppShortcutsPackage();
           // new NotificationManager();
            packages.add(new ExamplePackage());

          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());

          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    OkHttpClientProvider.setOkHttpClientFactory(new SSLPinnerFactory());
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.hesabemerchant.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}