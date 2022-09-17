/* Replace with your SQL commands */

CREATE TABLE vehicles (
    id SERIAL not null ,
    image text not null,
    name varchar(100) not null,
    model integer not null,
    driver_name varchar(100) not null,
    license_number text unique not null PRIMARY KEY
);

CREATE TABLE damagesinfo (
    id SERIAL PRIMARY KEY,
    damage_name varchar(100) NOT NULL,
    damage_cost numeric not null,
    healthy numeric not null
);

CREATE TABLE damages (
    id SERIAL PRIMARY KEY,
    damaged boolean not null,
    vehicle_id text REFERENCES vehicles(license_number)
);

CREATE TABLE vehicledamages (
    id SERIAL PRIMARY KEY,
    vehicle_id text unique REFERENCES vehicles(license_number),
    damage_id INTEGER REFERENCES damagesinfo(id)
);