package com.redhat.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Shipment extends PanacheEntity{

    @OneToOne
    public Port startPort;

    @OneToOne
    public Port endPort;
    
    @OneToOne
    public Ship ship;

    @OneToMany
    public List<Container> containers;

}
