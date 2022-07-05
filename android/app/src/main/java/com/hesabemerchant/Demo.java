package com.hesabemerchant;


import android.os.Bundle;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

public class Demo extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Toast.makeText(this, "Hello", Toast.LENGTH_SHORT).show();
    }
}