package com.example.will.jsonposttest;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Fuhrmann on 10/12/2017.
 */

public class Data {

    double lat;
    double lon;
    double speed;
    double gasUsage;

    public Data()
    {
        this.setLat(0.0);
        this.setLon(0.0);
        this.setSpeed(0.0);
        this.setGasUsage(0.0);
    }

    public Data(double lat_, double lon_, double speed_, double gasUsage_)
    {
        this.setLat(lat_);
        this.setLon(lon_);
        this.setSpeed(speed_);
        this.setGasUsage(gasUsage_);
    }

    public JSONObject dataToJSON()
    {
        JSONObject jsonData = new JSONObject();

        try {
            jsonData.put("lat", getLat());
            jsonData.put("lon", getLon());
            jsonData.put("speed", getSpeed());
            jsonData.put("gasUsage", getGasUsage());
        } catch(JSONException e)
        {

        }

        return jsonData;
    }




    public double getLat() { return lat; }
    public void setLat(double lat_) { this.lat = lat_; }

    public double getLon() { return lon; }
    public void setLon(double lon_) { this.lon = lon_; }

    public double getSpeed() { return speed; }
    public void setSpeed(double speed_) { this.speed = speed_; }

    public double getGasUsage() { return gasUsage; }
    public void setGasUsage(double gasUsage_) { this.gasUsage = gasUsage_; }
}
