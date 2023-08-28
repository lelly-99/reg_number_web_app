create table towns (
    id serial primary key,
    town_name varchar(10) not null);


create table registration_numbers (
	id serial not null primary key,
    registration_plate VARCHAR(10) NOT NULL,
	town_id int not null,
	foreign key (town_id) references towns(id)
);
