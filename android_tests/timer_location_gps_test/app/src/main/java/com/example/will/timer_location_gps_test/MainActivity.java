package com.example.will.timer_location_gps_test;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.os.Handler;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    //delay between next check in seconds
    private final int REFRESH_RATE = 5;

    private Handler mHandler = new Handler();

    public static final int MY_PERMISSIONS_REQUEST_LOCATION = 99;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

        public void onStart(View view)
        {
            mHandler.post(checkCoordinates);
        }
        public void onStop(View view)
        {
            mHandler.removeCallbacks(checkCoordinates);

        }


    /**
     * Create a Runnable startTimer that makes timer runnable.
     */
    private Runnable checkCoordinates = new Runnable() {
        public void run() {

            showCoordinates();

            mHandler.postDelayed(checkCoordinates, (long)REFRESH_RATE * 1000);
        }
    };
    
    private void showCoordinates()
    {
        TextView view = (TextView) findViewById(R.id.coordinates_text);

        if ( ContextCompat.checkSelfPermission( this, android.Manifest.permission.ACCESS_COARSE_LOCATION ) != PackageManager.PERMISSION_GRANTED ) {

            ActivityCompat.requestPermissions( this, new String[] {  android.Manifest.permission.ACCESS_COARSE_LOCATION  },
                    MY_PERMISSIONS_REQUEST_LOCATION);
        }

        LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        Criteria criteria = new Criteria();
        String bestProvider = locationManager.getBestProvider(criteria, false);


        Location location = locationManager.getLastKnownLocation(bestProvider);
        Double lat = 0.0,lon = 0.0;
        try {
            lat = location.getLatitude ();
            lon = location.getLongitude ();
        }
        catch (NullPointerException e){
            e.printStackTrace();
        }


        view.setText("Coordinates: (" + lat.toString() + ", " + lon.toString() + ") ");
    }
}
