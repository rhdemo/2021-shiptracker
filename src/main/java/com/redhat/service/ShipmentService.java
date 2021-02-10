package com.redhat.service;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import com.redhat.rest.ShipmentDTO;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient
@Path("/api/shipments")
public interface ShipmentService {
    
    @GET
    public List<ShipmentDTO> getShipments(); 
}
