package com.redhat.model;

import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Company extends PanacheEntity {

    public String name;
    public String addressLine;
    public String city;
    public String country;
    
}
