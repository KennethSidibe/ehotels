create table hotel_chains(
	id serial primary key,
	address text,
	email varchar(100),
	phone_number varchar(20)
);

create table hotels(
	id serial primary key,
	email varchar(100),
	address text,
	phone_number varchar(20),
	number_of_rooms int,
	category text,
	hotel_chain_id int references hotel_chains (id) -- FK 
);