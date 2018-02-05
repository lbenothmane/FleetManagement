package com.example.will.jsonposttest;

import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.util.Map;

import static android.view.View.GONE;

public class MainActivity extends AppCompatActivity {

    private Handler mHandler = new Handler();
    private final int REFRESH_RATE = 10000;//1000 * seconds between refresh
    public static final String TAG = "TAG";
    int driverId = 0;
    String url = "";
    RequestQueue queue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        queue = Volley.newRequestQueue(this);
    }

    public void start() {
        final EditText empNumImp = (EditText) findViewById(R.id.empNumImp);
        driverId = Integer.valueOf(empNumImp.getText().toString());
        JSONObject send = getStartJSON();
        postIDToServer(url, send);

        Button start = (Button) findViewById(R.id.startButton);
        start.setVisibility(View.GONE);

        empNumImp.setVisibility(View.GONE);

        Button stop = (Button) findViewById(R.id.stopButton);
        stop.setVisibility(View.VISIBLE);

    }

    public void stop() {
        Button start = (Button) findViewById(R.id.startButton);
        start.setVisibility(View.VISIBLE);

        EditText empNumImp = (EditText) findViewById(R.id.empNumImp);
        empNumImp.setVisibility(View.VISIBLE);

        Button stop = (Button) findViewById(R.id.stopButton);
        stop.setVisibility(View.GONE);

        queue.cancelAll(TAG);
    }

    public void postIDToServer(String url_, JSONObject JSONData_) {
        JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, url_, JSONData_,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d("Error.Response", "RESPONSE RECIEVED" + response.toString());
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", "RESPONSE ERROR");
                    }
                }
        );
        queue.add(postRequest);
    }

    public void putDataToServer(String url_, JSONObject JSONData_) {
        RequestQueue queue = Volley.newRequestQueue(this);
        JsonObjectRequest postRequest = new JsonObjectRequest(Request.Method.POST, url_, JSONData_,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d("Error.Response", "RESPONSE RECIEVED" + response.toString());
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", "RESPONSE ERROR");
                    }
                }
        );
        queue.add(postRequest);
    }

    public JSONObject getStartJSON() {
        JSONObject startJSON = new JSONObject();
        try {
            startJSON.put("id", driverId);
        } catch (JSONException e) {
            Log.d("JSONException", e.toString());
        }
        return startJSON;
    }

    /**
     * Create a Runnable startTimer that makes timer runnable.
     */
    private Runnable startTimer = new Runnable() {
        public void run() {

            //get Can-Bus data and put it

            //The following code is a test case to test put functionality
            //START TEST

            Data data = new Data(5.5, 4.4, 3.3, 2.2);
            JSONObject jo = data.dataToJSON();
            putDataToServer(url, jo);

            //END TEST

            mHandler.postDelayed(startTimer, (long) REFRESH_RATE);
        }
    };
}