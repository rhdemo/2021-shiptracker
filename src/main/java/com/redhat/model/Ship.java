package com.redhat.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Ship extends PanacheEntity {

    public String name;

    @Enumerated(EnumType.STRING)
    public ShipType vesselType;


}
