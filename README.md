## Postgresql 

### Local in dev mode with docker 

```
docker run --ulimit memlock=-1:-1 -it --rm=true --memory-swappiness=0 \
    --name postgres-quarkus-rest-http-crud -e POSTGRES_USER=sebi \
    -e POSTGRES_PASSWORD=sebi -e POSTGRES_DB=ship \
    -p 5432:5432 postgres:10.5

```
### Deployed as JAR

Quarkus will try to connect to a database named 'ship' running on : `jdbc:postgresql://postgresql/ship`

This can be overidden with a ENV VAR with the key : `QUARKUS_DATASOURCE_JDBC_URL`

It expects an user `sebi` with password `sebi` , if needed those can also be overidden with ENV VAR : 
`QUARKUS_DATASOURCE_USERNAME` and `QUARKUS_DATASOURCE_PASSWORD`
