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
import com.redhat.service.PortService;
import com.redhat.service.ShipService;
import com.redhat.service.ShipmentService;

import org.eclipse.microprofile.rest.client.inject.RestClient;


@Path("/shipments")
public class ShipmentResource {

    @RestClient
    ShipmentService shipmentService;

    @RestClient
    PortService portService;

    @RestClient
    ShipService shipService;

    @GET
    @Path("/local")
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
        halifax.longitude=-63.567;
        halifax.name="Halifax";
        halifax.persist();

        Port newyork = new Port();
        newyork.latitude=40.61555785493085;
        newyork.longitude=-74.17908961253214;
        newyork.name="New York";
        newyork.persist();

        Port norfolk = new Port();
        norfolk.latitude=36.92981451764536;
        norfolk.longitude=-76.32490750852378;
        norfolk.name="Norfolk";
        norfolk.persist();

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

    @GET
    public List<Shipment> getConsolidatedShipemnts(){
        List<Shipment> shipments = new ArrayList<Shipment>();
        shipmentService.getShipments().forEach(shipment -> {
            Shipment consolidatedShipment = new Shipment();
            consolidatedShipment.id = shipment.id;
            consolidatedShipment.startPort = portService.getPort(shipment.startPortId);
            consolidatedShipment.endPort = portService.getPort(shipment.endPortId);
            consolidatedShipment.ship = shipService.getShip(shipment.shipId);
            consolidatedShipment.percentTravelled = 50;
            consolidatedShipment.travelTime = "14 Days 2 hours";
            shipments.add(consolidatedShipment);
        });
        return shipments;
    }
}