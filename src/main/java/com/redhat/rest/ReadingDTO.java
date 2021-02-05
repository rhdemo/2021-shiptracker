package com.redhat.rest;

import javax.json.bind.annotation.JsonbCreator;

public class ReadingDTO {

    String shippingId;

    Double temperature;

    private ReadingDTO(String shippingId) {
        this.shippingId = shippingId;
    }

    @JsonbCreator
    public static ReadingDTO of(String shippingId) {
        return new ReadingDTO(shippingId);
    }
    
    public String getShippingId() {
        return shippingId + " | " + getTemperature() + " Celcius";
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    
    
}
