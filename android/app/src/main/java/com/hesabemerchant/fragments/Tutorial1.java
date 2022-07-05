package com.hesabemerchant.fragments;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.hesabemerchant.R;


public class Tutorial1 extends Base {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_tutorial_1, container, false);
        Context context =  getContext();
        if(getActivity() != null) {
            TextView tvSkip = (TextView) view.findViewById(R.id.tv_skip);
            if (tvSkip != null) {

                tvSkip.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        setTutorialShownState(context);
                        navigateToWelcome();
                    }
                });
            }
        }

        return view;
    }

}