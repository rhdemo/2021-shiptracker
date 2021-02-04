package com.redhat.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Container extends PanacheEntity {
    
    public String description;

    @OneToOne
    public Company sender;

    @OneToOne
    public Company receiver;

    @OneToMany
    public List<SensorReadings> readings;

}
