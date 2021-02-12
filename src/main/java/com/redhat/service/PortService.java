package com.redhat.service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.redhat.model.Port;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient
@Path("/api/ports")
public interface PortService {
    
    @GET
    @Path("/{id}")
    public Port getPort(@PathParam("id") long id); 

}
