package com.redhat.rest;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/readings")
public class ReadingsResource {

    private static final List<ReadingDTO> READINGS = 
    Arrays.asList("1245AB456","888XX456","1245WH456","F5WH456" ).stream().map(ReadingDTO::of).collect(Collectors.toList());


    @GET
    public ReadingDTO getRandomReading(){
        Random r = new Random();
        double randomValue = 100 * r.nextDouble();
        ReadingDTO readingDTO = READINGS.get(ThreadLocalRandom.current().nextInt(0, READINGS.size()));
        readingDTO.setTemperature(randomValue);
        return readingDTO;
    }

}
