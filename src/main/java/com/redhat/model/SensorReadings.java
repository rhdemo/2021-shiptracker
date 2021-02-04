package com.redhat.model;

import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class SensorReadings extends PanacheEntity {

    public double temperature;

    public double longitude;

    public double latitude;

    public double humidityRate;

}
