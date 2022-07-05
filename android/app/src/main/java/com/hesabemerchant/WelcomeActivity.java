package com.hesabemerchant;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.hesabemerchant.Utils.PrefManager;
import com.hesabemerchant.Utils.Utils;
import com.hesabemerchant.fragments.Tutorial1;
import com.hesabemerchant.fragments.Tutorial2;
import com.hesabemerchant.fragments.Tutorial3;
import com.hesabemerchant.fragments.Tutorial4;
import com.cuberto.liquid_swipe.LiquidPager;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

public class WelcomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LiquidPager liquidPager = (LiquidPager) findViewById(R.id.pager);

        ViewPagerAdapter adapter = new ViewPagerAdapter(getSupportFragmentManager(), FragmentPagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        adapter.addFrag(new Tutorial1());
        adapter.addFrag(new Tutorial2());
        adapter.addFrag(new Tutorial3());
        adapter.addFrag(new Tutorial4());
        liquidPager.setAdapter(adapter);
    }



    static class ViewPagerAdapter extends FragmentPagerAdapter {
        private final List<Fragment> mFragmentList = new ArrayList<>();

        public ViewPagerAdapter(FragmentManager manager, int behavior) {
            super(manager, behavior);
        }

        @NotNull
        @Override
        public Fragment getItem(int position) {
            return mFragmentList.get(position);
        }

        @Override
        public int getCount() {
            return mFragmentList.size();
        }

        public void addFrag(Fragment fragment) {
            mFragmentList.add(fragment);
        }

    }
}