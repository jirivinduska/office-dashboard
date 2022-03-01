create table color(id bigint not null AUTO_INCREMENT,color_hex varchar(255),created timestamp not null default CURRENT_TIMESTAMP, primary key (id));

CREATE TABLE weather_measurement(
id BIGINT NOT NULL AUTO_INCREMENT,
indoor_temp DECIMAL(6,2) NOT NULL,
outdoor_temp DECIMAL(6,2) NOT NULL,
cpu_temp DECIMAL(6,2) NOT NULL,
pressure DECIMAL(6,2) NOT NULL,
humidity DECIMAL(6,2) NOT NULL,
created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY ( ID )
);