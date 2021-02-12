package com.redhat.service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.redhat.model.Ship;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@Path("/api/ships")
@RegisterRestClient
public interface ShipService {
    @GET
    @Path("/{id}")
    public Ship getShip(@PathParam("id") long id); 

}
