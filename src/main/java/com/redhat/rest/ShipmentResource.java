package com.redhat.rest;

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
    public List<Shipment> allShipments() {
        return Shipment.listAll();
    }
    
    @GET
    @Path("/initdata")
    @Transactional
    public void initData() {
        Port london = new Port();
        london.latitude=51.51281107850145;
        london.longitude=0.48012948664782146;
        london.name="London";
        london.persist();

        Port halifax = new Port();
        halifax.latitude=44.65;
        halifax.longitude=63.567;
        halifax.name="Halifax";
        halifax.persist();

        Company sender = new Company();
        sender.addressLine="5, CLoud Native Street";
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

        Ship ship = new Ship();
        ship.name= "Big Ship";
        ship.vesselType=ShipType.CONTAINER_VESSEL;
        ship.persist();

        
    }
    @GET
    @Path("/init")
    @Transactional
    public void initShipments() {
        Shipment shipment = new Shipment();
        shipment.ship = Ship.find("name","Big Ship").firstResult();
        shipment.startPort = Port.find("name","London").firstResult();
        shipment.endPort = Port.find("name","Halifax").firstResult();
        shipment.persist();
        
    }
}