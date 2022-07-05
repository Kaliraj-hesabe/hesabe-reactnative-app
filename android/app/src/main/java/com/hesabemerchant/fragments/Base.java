package com.hesabemerchant.fragments;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.hesabemerchant.MainActivity;
import com.hesabemerchant.R;
import com.hesabemerchant.Utils.PrefManager;
import com.hesabemerchant.Utils.Utils;

/**
 * Created by Arsalan on 12,November,2020
 */
class Base extends Fragment {

    public void navigateToWelcome() {
        Intent mainIntent = new Intent(getActivity(), MainActivity.class);
        startActivity(mainIntent);
        if(getActivity() != null)
            //getActivity().finish();
            getActivity().finishAffinity();
    }

    public void initFragment(Fragment newFragment, Bundle args) {
        FragmentManager fragmentManager = this.getFragmentManager();
        FragmentTransaction transaction;
        if (fragmentManager != null) {
            if (newFragment != null) {
                if (args != null) {
                    newFragment.setArguments(args);
                }
                transaction = fragmentManager.beginTransaction();
                transaction.replace(R.id.main_frame_layout, newFragment);
                transaction.addToBackStack(null);
                transaction.commit();
            }
        }
    }

    public void setTutorialShownState(Context context) {
        if(context != null) {
            PrefManager prefManager = new PrefManager(context);
            prefManager.setTutorialShown(true);
            Utils.IsTutorialShown = true;
        }
    }

    public void hideProgress(Activity activity) {
        if (activity != null) {
            RelativeLayout progressBar = activity.findViewById(R.id.rl_progress_bar_home);
            if (progressBar != null)
                progressBar.setVisibility(View.GONE);
        }
    }

    public void showProgress(Activity activity) {
        if (activity != null) {
            RelativeLayout progressBar = activity.findViewById(R.id.rl_progress_bar_home);
            if (progressBar != null)
                progressBar.setVisibility(View.VISIBLE);
        }
    }



    public void toast(Context context, String msg) {
        if (context != null) {
            LayoutInflater inflater = getLayoutInflater();
            View customToastRoot = inflater.inflate(R.layout.layout_custom_toast, null);
            TextView tvMsg = customToastRoot.findViewById(R.id.toastMsg);
            tvMsg.setText(msg);
            Toast customToast = new Toast(context);
            customToast.setView(customToastRoot);
            customToast.setDuration(Toast.LENGTH_SHORT);
            customToast.show();
        }
    }

    protected void toast(Context context, int msg) {
        if (context != null) {
            LayoutInflater inflater = getLayoutInflater();
            View customToastRoot = inflater.inflate(R.layout.layout_custom_toast, null);
            TextView tvMsg = customToastRoot.findViewById(R.id.toastMsg);
            tvMsg.setText(msg);
            Toast customToast = new Toast(context);
            customToast.setView(customToastRoot);
            customToast.setDuration(Toast.LENGTH_SHORT);
            customToast.show();
        }
    }

}
