create table hotel_chains(
	id serial primary key,
	hotel_chain_name text not null,
	address text not null,
	email varchar(100) not null,
	phone_number varchar(20) not null,
	icon varchar(20) not null
);

create table hotels(
	id serial primary key,
	hotel_name text not null, 
	email varchar(100) not null,
	address text not null,
	phone_number varchar(20) not null,
	number_of_rooms int not null,
	category text,
	hotel_chain_id int not null references hotel_chains (id)  -- FK 
);
alter table clients add constraint UQ_Email unique(email);


create table employees(
	id serial primary key,
	first_name text not null,
	last_name text not null,
	job_role  text not null,
	phone_number varchar(20) not null,
	email text not null,
	nas varchar(15) not null,
	created_at timestamp not null default current_timestamp,
	hotel_id int not null references hotels(id),
	pwd text not null,
	address text,
	is_admin varchar(3) not null
);
alter table employees add constraint UQ_Employee_Email unique(email);

create table rooms(
	id serial primary key,
	name text not null,
	price int not null,
	room_number int not null,
	room_floor int not null,
	commodity text,
	capacity int not null,
	view text,
	extensions text,
	repairs text,
	number_of_rooms_for int;
	hotel_id int not null references hotels(id),
	hotel_chain_id int not null references hotel_chains(id)
);

-- A room is identified by the hotel chain and the hotel id or just its room id which is unique


create table reservations(
	id serial primary key,
	room_id int references rooms(id) not null,
	arrival_date timestamp not null,
	departure_date timestamp not null,
	client_id int references clients(id) not null,
	price int not null,
	created_at timestamp not null default current_timestamp
);
-- A reservation is identified by the client who made id (client.id) and the room reserved (room.id)

create table clients(
	id serial primary key,
	first_name text not null,
	last_name text not null,
	address text not null,
	created_at timestamp not null default current_timestamp
	email text not null,
	phone_number text not null,
);

-- How to backup postgresql database using terminal (WIN):

-- pg_dump -F c -v -p 5433 -U postgres -f ehotels-backup.dump ehotels

-- pg_dump -F c -v -p __port__ -U __user__ -f __filename__ __dbname__

-- How to restore backup 

-- pg_restore -p __port__ -U __user__ -d __new-db-name__ -1 __filename.dump__

-- Get the sql code to create tables : 
-- run this with terminal (WIN)

-- pg_dump --schema-only -p 5433 -U postgres ehotels > create-tables.sql

-- Get the sql code to have all the insert statement to have exactly the same db 
-- run this with terminal (WIN)
-- make sure to have pg_dump and pg_restore in your PATH ENVIRONMENT VARIABLE

-- pg_dump -U username -d dbname --column-inserts --data-only > dump.sql
-- pg_dump -U postgres -d ehotels --column-inserts --data-only > insertAllData.sql
