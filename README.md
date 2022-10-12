## Postgresql 

### Local in dev mode with docker 

Check out application.properties for database connection information.

```
docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 \
    --name postgres-quarkus-rest-http-crud -e POSTGRES_USER=ship \
    -e POSTGRES_PASSWORD=ship -e POSTGRES_DB=ship \
    -p 5432:5432 postgres:10.5
```

### Local Development

```
mvn quarkus:dev
```

To populate the Port, Ship and Shipment tables

```
curl localhost:8080/shipments/setup
```

To manually increment Ship movement by 10%
```
curl localhost:8080/shipments/move
```

### Deployed as JAR

Quarkus will try to connect to a database named 'ship' running on : `jdbc:postgresql://postgresql/ship`

This can be overidden with a ENV VAR with the key : `QUARKUS_DATASOURCE_JDBC_URL`

It expects an user `ship` with password `ship` , if needed those can also be overidden with ENV VAR : 
`QUARKUS_DATASOURCE_USERNAME` and `QUARKUS_DATASOURCE_PASSWORD`
