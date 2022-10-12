package com.redhat.rest;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;


import com.redhat.model.Company;
import com.redhat.model.Port;
import com.redhat.model.Ship;
import com.redhat.model.ShipType;
import com.redhat.model.Shipment;


@Path("/shipments")
public class ShipmentResource {
    @GET
    public List<Shipment> getConsolidatedShipments(){
        // return mockshipments();
        System.out.println("Real Shipments");
        return Shipment.listAll();
    }

    @GET
    @Path("/hello")
    public String hello() {
        return "Hello " + new java.util.Date();
    }

    @GET
    @Path("/mockshipments")
    public List<Shipment> mockshipments() {
        System.out.println("mockshipments " + new java.util.Date());
        // return randomShipments();        
        // return loopingShipments();
        return getConsolidatedShipments();
    }

    int loopCount = 1;
    private List<Shipment> loopingShipments() {
        System.out.println("Looping  " + new java.util.Date());
        List<Shipment> shipments = new ArrayList<Shipment>();

        Ship ship = new Ship();
        ship.name= "Big Ship";
        ship.vesselType=ShipType.CONTAINER_VESSEL;

        Port nagoya = new Port();
        nagoya.id = 4L;
        nagoya.latitude = 35.092835;
        nagoya.longitude = 136.758316;
        nagoya.name = "Nagoya";

        Port losangeles = new Port();
        losangeles.id = 3L;
        losangeles.latitude = 33.763663;
        losangeles.longitude = -118.378756;
        losangeles.name = "Los Angeles";

        Port london = new Port();
        london.latitude=51.51281107850145;
        london.longitude=0.48012948664782146;
        london.name="London";
        london.persist();

        Port halifax = new Port();
        halifax.latitude=44.65;
        halifax.longitude=-63.567;
        halifax.name="Halifax";
        halifax.persist();


        Port tangier = new Port();
        tangier.latitude=35.766667;
        tangier.longitude=-5.8;
        tangier.name="Tangier";
        tangier.persist();

        Port lisbon = new Port();
        lisbon.latitude=38.725267;
        lisbon.longitude=-9.150019;
        lisbon.name="Lisbon";
        lisbon.persist();

        Port colonCity = new Port();
        colonCity.latitude=9.359;
        colonCity.longitude=-79.901;
        colonCity.name="Colon City";
        colonCity.persist();



        Shipment shipment1 = new Shipment();
        shipment1.id = 1L;

        shipment1.startPort = nagoya;
        shipment1.endPort = losangeles;
        shipment1.ship = ship;
        
        if (loopCount < 33) {
            shipment1.percentTravelled = loopCount * 3;
            shipment1.travelTime = loopCount * 3 + " hours";
            loopCount++;
        } else {
            loopCount = 1;
            shipment1.percentTravelled = loopCount * 3;
            shipment1.travelTime = loopCount * 3 + " hours";
        }

        shipments.add(shipment1);
        return shipments;
    }

    @GET
    @Transactional
    @Path("/move")
    public void move() {
        System.out.println("move");
        List<Shipment> shipments = Shipment.listAll();
        shipments.forEach(shipment -> {
            if (shipment.percentTravelled < 90)
            shipment.percentTravelled = shipment.percentTravelled + 10;
            else shipment.percentTravelled = 10;
        });
    }

    @GET
    @Transactional
    @Path("/setup")
    public List<Shipment> randomShipments() {
        System.out.println("Random  " + new java.util.Date());
        Ship ship = new Ship();
        ship.name= "Big Ship";
        ship.vesselType=ShipType.CONTAINER_VESSEL;

        ship.persist();

        Company sender = new Company();
        sender.addressLine="5, Cloud Native Street";
        sender.city ="London";
        sender.country="UK";
        sender.name="The Sender";
        sender.persist();

        Company receiver = new Company();
        receiver.addressLine="10, Microservices Avenue";
        receiver.city ="Halifax";
        receiver.country="USA";
        receiver.name="The Receiver";
        receiver.persist();
        
        Port newyork = new Port();
        newyork.id = null;
        newyork.latitude=40.61555785493085;
        newyork.longitude=-74.17908961253214;
        newyork.name="New York";
        newyork.persist();
    
        Port capetown = new Port();
        capetown.id = null;
        capetown.latitude=-33.843174;
        capetown.longitude=18.830705;
        capetown.name="Cape Town";
        capetown.persist();
        
        Port losangeles = new Port();
        losangeles.id = null;
        losangeles.latitude = 33.763663;
        losangeles.longitude = -118.378756;
        losangeles.name = "Los Angeles";
        losangeles.persist();

        Port nagoya = new Port();
        nagoya.id = null;
        nagoya.latitude = 35.092835;
        nagoya.longitude = 136.758316;
        nagoya.name = "Nagoya";
        nagoya.persist();
    
        Port rotterdam = new Port();
        rotterdam.id = null;
        rotterdam.latitude = 51.908774;
        rotterdam.longitude= 4.150368;
        rotterdam.name = "Rotterdam";
        rotterdam.persist();

        Port norfolk = new Port();
        norfolk.id = null;
        norfolk.latitude = 36.845846;
        norfolk.longitude = -76.310805;
        norfolk.name = "Norfolk";
        norfolk.persist();

        Port sydney = new Port();
        sydney.id = null;
        sydney.latitude = -33.987613;
        sydney.longitude = 151.141125;
        sydney.name = "Sydney";
        sydney.persist();

        Port seattle = new Port();
        seattle.id = null;
        seattle.latitude = 47.620431;
        seattle.longitude = -122.353497;
        seattle.name = "Seattle";
        seattle.persist();

        List<Shipment> shipments = new ArrayList<Shipment>();

        int randomPercentTraveled = new java.util.Random().nextInt(99);        
        Shipment shipment1 = new Shipment();
        shipment1.id = null;

        shipment1.startPort = capetown;
        shipment1.endPort = newyork;
        shipment1.ship = ship;
        shipment1.percentTravelled = randomPercentTraveled;
        shipment1.travelTime = "5 Days 2 hours";

        shipment1.persist();
        shipments.add(shipment1);

        randomPercentTraveled = new java.util.Random().nextInt(99);
        Shipment shipment2 = new Shipment();
        shipment2.id = null;

        shipment2.startPort = nagoya;
        shipment2.endPort = losangeles;
        shipment2.ship = ship;
        shipment2.percentTravelled = randomPercentTraveled;
        shipment2.travelTime = "1 Days 2 hours";

        shipment2.persist();
        shipments.add(shipment2);

        randomPercentTraveled = new java.util.Random().nextInt(99);
        Shipment shipment3 = new Shipment();
        shipment3.id = null;
        shipment3.startPort = rotterdam;
        shipment3.endPort = norfolk;
        shipment3.ship = ship;
        // shipment3.percentTravelled = 25;
        shipment3.percentTravelled = randomPercentTraveled;
        shipment3.travelTime = "2 days 18 hours";

        shipment3.persist();
        shipments.add(shipment3);

        randomPercentTraveled = new java.util.Random().nextInt(99);
        Shipment shipment4 = new Shipment();
        shipment4.id = null;
        shipment4.startPort = sydney;
        shipment4.endPort = seattle;
        shipment4.ship = ship;
        shipment4.percentTravelled = randomPercentTraveled;
        shipment4.travelTime = "6 days 8 hours";

        shipment4.persist();
        shipments.add(shipment4);


        return shipments;

    }

}