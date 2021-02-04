package com.redhat.model;

import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Port extends PanacheEntity {

    public String name;

    public double latitude;

    public double longitude;
    
}
