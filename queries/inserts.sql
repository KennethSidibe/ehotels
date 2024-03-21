
-- Some hotel chains 

insert into hotel_chains (hotel_chain_name, address, email, phone_number) 
values (
'Refuge du Porc',
'108 escapades des Sidibes, Ouagadougou, Burkina Faso, B1A 2C3',
'steve@refugeduporc.com',
'+22670605040'
);

insert into hotel_chains (name, address, email, phone_number) 
values (
'Sables de Saaba',
'236 rue de Karpala, Ouagadougou, Burkina Faso, S1C 7A1',
'ken@sablesdesaaba.com',
'+22673328404'
);

insert into hotel_chains (hotel_chain_name, address, email, phone_number) 
values (
'Bicyclettes des Poulets',
'530 fuite des Tapsoba, Dédougou, Burkina Faso, Z1V 9X0',
'moussa@byciclettedespoulets.com',
'+22652403020'
);

-- some hotels 

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'La 150',
	'laafi@la150.com',
	'101 coulés des Kouadio, Ouagadougou, Burkina Faso, Q2E 2R2',
	'+22690807070',
	20,
	'relaxation',
	1
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'Chez les debouts',
	'contact@chezlesdebouts.com',
	'202 debout des Sidibe, Ouagadougou, Burkina Faso, O2P 1Z1',
	'+22650609090',
	20,
	'relaxation',
	1
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'Chez les coulés',
	'contact@chezlescoules.com',
	'203 coulés des ouedraogo, Ouagadougou, Burkina Faso, A1Z 0G8',
	'+22660607070',
	100,
	'éco',
	1
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'Bonjour la galère',
	'contact@bonjourlagalere.com',
	'707 la rue des problèmes, Ouagadougou, Burkina Faso, C1Y 7X6',
	'+22666670719',
	500,
	'éco-thérapie',
	2
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'La baobab des Pros',
	'contact@baobadespros.com',
	'80 secteur sans soucis, Ouagadougou, Burkina Faso, A1y 0D0',
	'+22655667788',
	20,
	'Luxe & Relaxation',
	2
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'Loin des Jaloux',
	'contact@loindesjaloux.com',
	'909 la rue interdite aux pauvres, Ouagadougou, Burkina Faso, V2C 6X6',
	'+22661625646',
	50,
	'Luxe Premium',
	2
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'Yafoye, la place',
	'contact@yafoyelaplace.com',
	'401 passage des peulhs, Ouagadougou, Burkina Faso, I2C 0T2',
	'+22667768668',
	60,
	'Travail et palabres sous le baoba',
	3
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'La place des hommes fidèles',
	'contact@placedeshommesfideles.com',
	'102 route des fidèles, Ouagadougou, Burkina Faso, B2O 7V7',
	'+22670717273',
	60,
	'Relaxation',
	3
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'Laafi Baala',
	'contact@laafibala.com',
	'303 boulevard des Moosis, Ouagadougou, Burkina Faso, I2C 0T2',
	'+22654458908',
	20,
	'Vacances et bière',
	3
);

insert into hotels (hotel_name, email, address, phone_number, 
					number_of_rooms, category, hotel_chain_id) 
values (
	'Le refuge des célibataires',
	'contact@refugedescelibataires.com',
	'105 avenue des célibataires, Ouagadougou, Burkina Faso, B2O 7V7',
	'+22660616263',
	45,
	'Travail',
	3
);

-- some rooms 

insert into rooms(room_type, price, hotel_id, 
				  hotel_chain_id, room_number, room_floor)
values (
	'luxe',
	140,
	1,
	1,
	901,
	9
);	

insert into rooms(room_type, price, hotel_id, 
				  hotel_chain_id, room_number, room_floor)
values (
	'éco',
	40,
	1,
	1,
	501,
	5
);	

insert into rooms(room_type, price, hotel_id, 
				  hotel_chain_id, room_number, room_floor)
values (
	'normal',
	80,
	1,
	1,
	501,
	5
);				  

-- some clients 

insert into clients (first_name, last_name, address, email) 
values (
	'Soure',
	'Yiri',
	'120 boulevard de la poussière, Ouagadougou, Burkina Faso, S7P 1G6',
	'soureleboss@gmail.com'
);

insert into clients (first_name, last_name, address, email) 
values (
	'Romaric',
	'Tapsoba',
	'345 rue de saaba, Ouagadougou, Burkina Faso, X7K 9S8',
	'romatapso23@gmail.com'
);

insert into clients (first_name, last_name, address, email) 
values (
	'Patrick',
	'Mutumba',
	'34 passage aride, Ouagadougou, Burkina Faso, B7A 3G2',
	'patrickdupassage@gmail.com'
);

-- some employees 

insert into employees (first_name, last_name, job_role, 
					   phone_number, email, nas, hotel_id)
values(
	'Fidèle',
	'Soré',
	'Support Clientèle',
	'+22657756446',
	'sorefidele123@gmail.com',
	'843782034',
	1
);					   					  

insert into employees (first_name, last_name, job_role, 
					   phone_number, email, nas, hotel_id)
values(
	'Roger',
	'Pengwende',
	'Technicien de surface',
	'+22674475665',
	'rogerpeng21@gmail.com',
	'754750902',
	1
);					   					  

insert into employees (first_name, last_name, job_role, 
					   phone_number, email, nas, hotel_id)
values(
	'Richard',
	'Touré',
	'Caissier',
	'+22682905678',
	'richardtoure3@gmail.com',
	'912087567',
	1
);					   					  

