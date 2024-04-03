-- run this query to copy the db directly and insert all the values to test 

-- ************************* CREATE TABLES *******************************
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    address text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    job_role text NOT NULL,
    phone_number character varying(20) NOT NULL,
    email text NOT NULL,
    nas character varying(15) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    hotel_id integer NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: hotel_chains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotel_chains (
    id integer NOT NULL,
    hotel_chain_name text NOT NULL,
    address text NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(20) NOT NULL
);


ALTER TABLE public.hotel_chains OWNER TO postgres;

--
-- Name: hotel_chains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotel_chains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hotel_chains_id_seq OWNER TO postgres;

--
-- Name: hotel_chains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotel_chains_id_seq OWNED BY public.hotel_chains.id;


--
-- Name: hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotels (
    id integer NOT NULL,
    hotel_name text NOT NULL,
    email character varying(100) NOT NULL,
    address text NOT NULL,
    phone_number character varying(20) NOT NULL,
    number_of_rooms integer NOT NULL,
    category text,
    hotel_chain_id integer NOT NULL
);


ALTER TABLE public.hotels OWNER TO postgres;

--
-- Name: hotels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hotels_id_seq OWNER TO postgres;

--
-- Name: hotels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotels_id_seq OWNED BY public.hotels.id;


--
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    room_id integer NOT NULL,
    reservation_date timestamp without time zone NOT NULL,
    client_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_id_seq OWNER TO postgres;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    room_type text NOT NULL,
    price integer NOT NULL,
    commodity text,
    capacity integer,
    view text,
    extensions text,
    repairs text,
    hotel_id integer NOT NULL,
    hotel_chain_id integer NOT NULL,
    room_number integer NOT NULL,
    room_floor integer NOT NULL
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rooms_id_seq OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: hotel_chains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel_chains ALTER COLUMN id SET DEFAULT nextval('public.hotel_chains_id_seq'::regclass);


--
-- Name: hotels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels ALTER COLUMN id SET DEFAULT nextval('public.hotels_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Name: rooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: hotel_chains hotel_chains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel_chains
    ADD CONSTRAINT hotel_chains_pkey PRIMARY KEY (id);


--
-- Name: hotels hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT hotels_pkey PRIMARY KEY (id);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: rooms uc_room_number; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT uc_room_number UNIQUE (room_number, hotel_id);


--
-- Name: employees employees_hotel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_hotel_id_fkey FOREIGN KEY (hotel_id) REFERENCES public.hotels(id);


--
-- Name: hotels hotels_hotel_chain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT hotels_hotel_chain_id_fkey FOREIGN KEY (hotel_chain_id) REFERENCES public.hotel_chains(id);


--
-- Name: reservations reservations_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id);


--
-- Name: reservations reservations_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id);


--
-- Name: rooms rooms_hotel_chain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_hotel_chain_id_fkey FOREIGN KEY (hotel_chain_id) REFERENCES public.hotel_chains(id);


--
-- Name: rooms rooms_hotel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_hotel_id_fkey FOREIGN KEY (hotel_id) REFERENCES public.hotels(id);


--
-- PostgreSQL database dump complete
--


-- ************************* CREATE TABLES *******************************


-- ************************* INSERT DATA *******************************
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (2, 'Soure', 'Yiri', '120 boulevard de la poussi├¿re, Ouagadougou, Burkina Faso, S7P 1G6', '2024-03-21 23:45:15.536098', 'soureleboss@gmail.com', '+22687789060', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (3, 'Patrick', 'Mutumba', '34 passage aride, Ouagadougou, Burkina Faso, B7A 3G2', '2024-03-21 23:46:50.069152', 'patrickdupassage@gmail.com', '+22690807050', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (4, 'Marc', 'Kouam├⌐', '203 rue des boss, Ouaga, Burkina Faso, A9V 8Z8', '2024-03-28 23:17:46.548619', 'marckouame@gmail.com', '+22670078008', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (1, 'Roger', 'Pengwende', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', '2024-03-21 23:44:16.347904', 'rogerpeng21@gmail.com', '(343) 928-4423', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (12, 'Ken', 'Sidibe', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-03-29 06:11:19.059354', 'souleymane@ken.com', '+22678879003', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (13, 'Ken', 'Sidibe', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-03-29 06:12:40.390754', 'mamadou@ken.com', '+22680087007', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (25, 'Alpha', 'Premier', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-03-31 23:50:16.485723', 'alpha@gmail.com', '(343) 586-9234', '$2b$10$wRdpFTSEYxlLHnSsSo1kuOhO4BdMxC1J0r6friLoHNkkDw/LN0yg.');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (24, 'Kenneth', 'Police', '502 tuerie des points, Ouaga, BF, Q8O P8A', '2024-03-30 08:28:59.294312', 'ken@police.com', '(543) 923-9029', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (14, 'Ken', 'Sidibe', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-03-29 06:14:43.770912', 'amirah@ken.com', '+22660067080', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (15, 'Ken', 'Sidibe', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-03-29 06:32:03.985876', 'dougsaka@ken.com', '+22678235689', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (16, 'Ken', 'Sidibe', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-03-29 06:41:12.019002', 'sari@ken.com', '+22687942134', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (17, 'Ken', 'Sidibe', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-03-29 06:51:13.518247', 'wablo@ken.com', '+22690705789', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (18, 'moussa', 'sidibe', '502 tuerie des points, Ouaga, BF, Q8O P8A', '2024-03-30 08:14:55.740267', 'steve@ken.com', '+22650056780', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (19, 'moussa', 'sidibe', '502 tuerie des points, Ouaga, BF, Q8O P8A', '2024-03-30 08:17:51.508401', 'maudia@ken.com', '+22675767778', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (20, 'moussa', 'sidibe', '502 tuerie des points, Ouaga, BF, Q8O P8A', '2024-03-30 08:23:06.35663', 'romarci@ken.com', '+22689987009', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (21, 'moussa', 'sidibe', '502 tuerie des points, Ouaga, BF, Q8O P8A', '2024-03-30 08:25:01.838821', 'ken@kenneth.com', '+22678123456', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (22, 'moussa', 'sidibe', '502 tuerie des points, Ouaga, BF, Q8O P8A', '2024-03-30 08:26:30.21807', 'pur@ken.com', '+22654456776', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (23, 'moussa', 'sidibe', '502 tuerie des points, Ouaga, BF, Q8O P8A', '2024-03-30 08:27:39.070231', 'loic@kn.com', '+22680089009', '$2b$10$663HnZ7gLKvtkfuEK6iEb.wMXdmju8TadosQGizW3UWc00PeC1dtK');
INSERT INTO public.clients (id, first_name, last_name, address, created_at, email, phone_number, pwd) VALUES (26, 'Ken', 'Sidibe', '232 la rue des codeurs, Samadin, BF, X7J Z7Z', '2024-04-03 00:17:53.393377', 'ken@ken.com', '(434) 789-7887', '$2b$10$O4YIrZizNDdXgqF4zdJ1t.i4b2s8xk5GHmx8GfCRcvtReJCNwdqMi');


--
-- Data for Name: hotel_chains; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.hotel_chains (id, hotel_chain_name, address, email, phone_number, icon) VALUES (1, 'Sables de Saaba', '236 rue de Karpala, Ouagadougou, Burkina Faso, S1C 7A1', 'ken@sablesdesaaba.com', '+22673328404', '≡ƒªë');
INSERT INTO public.hotel_chains (id, hotel_chain_name, address, email, phone_number, icon) VALUES (2, 'Bicyclettes des Poulets', '530 fuite des Tapsoba, D├⌐dougou, Burkina Faso, Z1V 9X0', 'moussa@byciclettedespoulets.com', '+22652403020', '≡ƒææ');
INSERT INTO public.hotel_chains (id, hotel_chain_name, address, email, phone_number, icon) VALUES (3, 'Refuge du Porc', '108 escapades des Sidibes, Ouagadougou, Burkina Faso, B1A 2C3', 'steve@refugeduporc.com', '+22670605040', '≡ƒÅ║');


--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (1, 'La 150', 'laafi@la150.com', '101 coul├⌐s des Kouadio, Ouagadougou, Burkina Faso, Q2E 2R2', '+22690807070', 20, 'relaxation', 1);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (2, 'Chez les debouts', 'contact@chezlesdebouts.com', '202 debout des Sidibe, Ouagadougou, Burkina Faso, O2P 1Z1', '+22650609090', 20, 'relaxation', 1);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (3, 'Chez les coul├⌐s', 'contact@chezlescoules.com', '203 coul├⌐s des ouedraogo, Ouagadougou, Burkina Faso, A1Z 0G8', '+22660607070', 100, '├⌐co', 1);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (10, 'La place des hommes fid├¿les', 'contact@placedeshommesfideles.com', '102 route des fid├¿les, Ouagadougou, Burkina Faso, B2O 7V7', '+22670717273', 60, 'Relaxation', 3);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (11, 'Le refuge des c├⌐libataires', 'contact@refugedescelibataires.com', '105 avenue des c├⌐libataires, Ouagadougou, Burkina Faso, B2O 7V7', '+22660616263', 45, 'Travail', 3);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (4, 'Bonjour la gal├¿re', 'contact@bonjourlagalere.com', '707 la rue des probl├¿mes, Ouagadougou, Burkina Faso, C1Y 7X6', '+22666670719', 500, '├⌐co', 2);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (5, 'La baobab des Pros', 'contact@baobadespros.com', '80 secteur sans soucis, Ouagadougou, Burkina Faso, A1y 0D0', '+22655667788', 20, 'Luxe', 2);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (6, 'Loin des Jaloux', 'contact@loindesjaloux.com', '909 la rue interdite aux pauvres, Ouagadougou, Burkina Faso, V2C 6X6', '+22661625646', 50, 'Royal', 2);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (8, 'Laafi Baala', 'contact@laafibala.com', '303 boulevard des Moosis, Ouagadougou, Burkina Faso, I2C 0T2', '+22654458908', 20, 'Vacances', 3);
INSERT INTO public.hotels (id, hotel_name, email, address, phone_number, number_of_rooms, category, hotel_chain_id) VALUES (9, 'Yafoye, la place', 'contact@yafoyelaplace.com', '401 passage des peulhs, Ouagadougou, Burkina Faso, I2C 0T2', '+22667768668', 60, 'Palabres', 3);


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (27, 'Moise', 'Baleke', 'Menuisier', '(324) 928-4324', 'MoiseMenuisier@gmail.com', '232823845', '2024-04-02 21:09:05.919891', 10, '$2b$10$sFjZlGlxo0f8wUjl0CWyZ.6QjEorMxBYtAWtywVK1UokcaZ7LIijO', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (2, 'Fid├¿le', 'Sor├⌐', 'Support Client├¿le', '+22657756446', 'sorefidele123@gmail.com', '843782034', '2024-03-21 23:51:43.44916', 1, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (3, 'Richard', 'Tour├⌐', 'Caissier', '+22682905678', 'richardtoure3@gmail.com', '912087567', '2024-03-21 23:53:40.434786', 1, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (4, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'christopherpeng@gmail.com', '439085023', '2024-03-31 20:56:41.677965', 2, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (6, 'Sylvain', 'Tapsoba', 'Menuisier expert', '+22608099023', 'sylvaintapso@gmail.com', '934860283', '2024-03-31 20:58:51.221995', 4, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (7, 'Prodige', 'Mutamba', 'Porte-Parole', '+22650056006', 'prodigeducongo@gmail.com', '820394856', '2024-03-31 20:58:51.221995', 4, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (5, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'marcelolapelo@gmail.com', '439085023', '2024-03-31 20:58:51.221995', 4, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (8, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'robertmorice@gmail.com', '93840293', '2024-03-31 20:59:24.133054', 5, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (10, 'Prodige', 'Mutamba', 'Porte-Parole', '+22650056006', 'policelapopoo@gmail.com', '938405869', '2024-03-31 20:59:24.133054', 5, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (1, 'Roger', 'Pengwende', 'Technicien de surface', '+22674475665', 'rogerpeng21@gmail.com', '754750902', '2024-03-21 23:50:07.407201', 1, '$2b$10$jebwcV2c7qy7bLfDEzrZy.KCcd2zHljrDcrEWaKZV0WecpXXyLYpK', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'YES');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (9, 'Sylvain', 'Tapsoba', 'Menuisier expert', '+22608099023', 'fataoduburkina@gmail.com', '029394850', '2024-03-31 20:59:24.133054', 5, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (11, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'aigleoncommence@gmail.com', '850193283', '2024-03-31 20:59:57.786634', 6, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (12, 'Sylvain', 'Tapsoba', 'Menuisier expert', '+22608099023', 'ezanacongo@gmail.com', '029394850', '2024-03-31 20:59:57.786634', 6, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (13, 'Prodige', 'Mutamba', 'Porte-Parole', '+22650056006', 'allezlesetalons@gmail.com', '018683058', '2024-03-31 20:59:57.786634', 6, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (14, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'etalonsyabut@gmail.com', '930293485', '2024-03-31 21:00:45.952826', 8, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (15, 'Sylvain', 'Tapsoba', 'Menuisier expert', '+22608099023', 'burkindiyapuissanci@gmail.com', '958602934', '2024-03-31 21:00:45.952826', 8, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (16, 'Prodige', 'Mutamba', 'Porte-Parole', '+22650056006', 'uneemail2@gmail.com', '102345860', '2024-03-31 21:00:45.952826', 8, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (17, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'monemail@gmail.com', '102938506', '2024-03-31 21:01:13.685343', 9, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (18, 'Sylvain', 'Tapsoba', 'Menuisier expert', '+22608099023', 'tonemail@gmail.com', '049568304', '2024-03-31 21:01:13.685343', 9, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (19, 'Prodige', 'Mutamba', 'Porte-Parole', '+22650056006', 'bestemployee@gmail.com', '939405961', '2024-03-31 21:01:13.685343', 9, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (21, 'Sylvain', 'Tapsoba', 'Menuisier expert', '+22608099023', 'regis24@gmail.com', '049568304', '2024-03-31 21:01:44.348407', 10, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (23, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'yankoua@gmail.com', '192483029', '2024-03-31 21:02:23.123429', 11, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (24, 'Sylvain', 'Tapsoba', 'Menuisier expert', '+22608099023', 'luciole@gmail.com', '294059672', '2024-03-31 21:02:23.123429', 11, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (25, 'Prodige', 'Mutamba', 'Porte-Parole', '+22650056006', 'aimetapatrie@gmail.com', '859402934', '2024-03-31 21:02:23.123429', 11, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (20, 'Christopher', 'Pengwende', 'R├⌐parateur de portes', '+22647745665', 'hommefidele@gmail.com', '102938506', '2024-03-31 21:01:44.348407', 10, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '405 impasse des meilleurs employ├⌐s, Ouagadougou, BF, W1E R3R', 'YES');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (22, 'Prodige', 'Mutamba', 'Porte-Parole', '(542) 934-8523', 'gedeon12@gmail.com', '286950482', '2024-03-31 21:01:44.348407', 10, '$2b$10$nJcG5c2GoT0aBspeNVtSiuaXmKZnzgaMhb4faQAn7mBHZGSPatSP.', '808 impasse des pires employ├⌐es, Ouagadougou, FR, W1E R3R', 'NO');
INSERT INTO public.employees (id, first_name, last_name, job_role, phone_number, email, nas, created_at, hotel_id, pwd, address, is_admin) VALUES (28, 'Marc', 'Koua', 'Laveur de carreaux', '(327) 453-8532', 'marc@lavagedecarreaux.com', '273-824-231', '2024-04-02 21:26:27.760116', 10, '$2b$10$sFjZlGlxo0f8wUjl0CWyZ.6QjEorMxBYtAWtywVK1UokcaZ7LIijO', '808 impasse des pires employ├⌐es, Ouagadougou, FR, W1E R3R', 'YES');


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (62, 'luxe', 520, NULL, 2, NULL, NULL, NULL, 11, 3, 901, 9, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (63, 'normal', 100, NULL, 2, NULL, NULL, NULL, 11, 3, 502, 5, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (64, '├⌐co', 20, NULL, 2, NULL, NULL, NULL, 11, 3, 301, 3, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (32, '├⌐co', 40, NULL, 2, NULL, NULL, NULL, 1, 1, 201, 2, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (35, 'luxe', 200, NULL, 2, NULL, NULL, NULL, 2, 1, 901, 9, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (37, 'normal', 60, NULL, 2, NULL, NULL, NULL, 2, 1, 502, 5, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (38, '├⌐co', 40, NULL, 2, NULL, NULL, NULL, 2, 1, 301, 3, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (39, 'luxe', 150, NULL, 2, NULL, NULL, NULL, 3, 1, 901, 9, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (40, 'normal', 90, NULL, 2, NULL, NULL, NULL, 3, 1, 502, 5, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (41, '├⌐co', 60, NULL, 2, NULL, NULL, NULL, 3, 1, 301, 3, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (42, 'luxe', 500, NULL, 2, NULL, NULL, NULL, 4, 2, 901, 9, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (43, 'normal', 200, NULL, 2, NULL, NULL, NULL, 4, 2, 502, 5, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (44, '├⌐co', 120, NULL, 2, NULL, NULL, NULL, 4, 2, 301, 3, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (45, 'luxe', 1000, NULL, 2, NULL, NULL, NULL, 5, 2, 901, 9, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (46, 'normal', 600, NULL, 2, NULL, NULL, NULL, 5, 2, 502, 5, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (47, '├⌐co', 250, NULL, 2, NULL, NULL, NULL, 5, 2, 301, 3, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (48, 'luxe', 100, NULL, 2, NULL, NULL, NULL, 6, 2, 901, 9, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (49, 'normal', 50, NULL, 2, NULL, NULL, NULL, 6, 2, 502, 5, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (50, '├⌐co', 20, NULL, 2, NULL, NULL, NULL, 6, 2, 301, 3, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (51, 'luxe', 230, NULL, 2, NULL, NULL, NULL, 8, 3, 901, 9, 40, 'Business');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (52, 'normal', 180, NULL, 2, NULL, NULL, NULL, 8, 3, 502, 5, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (53, '├⌐co', 75, NULL, 2, NULL, NULL, NULL, 8, 3, 301, 3, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (54, 'luxe', 2000, NULL, 2, NULL, NULL, NULL, 9, 3, 901, 9, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (55, 'normal', 1400, NULL, 2, NULL, NULL, NULL, 9, 3, 502, 5, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (56, '├⌐co', 999, NULL, 2, NULL, NULL, NULL, 9, 3, 301, 3, 40, 'deluxe');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (59, 'luxe', 500, NULL, 2, NULL, NULL, NULL, 10, 3, 901, 9, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (60, 'normal', 250, NULL, 2, NULL, NULL, NULL, 10, 3, 502, 5, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (31, 'luxe', 140, NULL, 1, NULL, NULL, NULL, 1, 1, 901, 9, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (33, 'normal', 80, NULL, 3, NULL, NULL, NULL, 1, 1, 501, 5, 40, 'standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (61, 'normal', 333, NULL, 2, NULL, NULL, NULL, 10, 3, 301, 3, 40, 'Deluxe standard');
INSERT INTO public.rooms (id, room_type, price, commodity, capacity, room_view, extensions, repairs, hotel_id, hotel_chain_id, room_number, room_floor, number_of_rooms_for, room_name) VALUES (68, 'normal', 123, NULL, 2, NULL, NULL, NULL, 10, 3, 777, 7, 12, 'Sleep Passant');


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (5, 31, '2024-03-08 00:00:00', 3, '2024-03-29 05:16:19.783067', '2024-03-10 00:00:00', 500);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (6, 32, '2024-03-08 00:00:00', 3, '2024-03-29 05:29:17.654468', '2024-03-10 00:00:00', 200);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (7, 31, '2024-03-08 00:00:00', 12, '2024-03-29 06:11:19.062809', '2024-03-15 00:00:00', 840);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (8, 31, '2024-03-14 00:00:00', 13, '2024-03-29 06:12:40.394108', '2024-03-22 00:00:00', 1120);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (9, 64, '2024-03-16 00:00:00', 14, '2024-03-29 06:14:43.77303', '2024-03-23 00:00:00', 140);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (10, 33, '2024-03-07 00:00:00', 15, '2024-03-29 06:32:03.988007', '2024-03-15 00:00:00', 560);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (11, 43, '2024-03-07 00:00:00', 16, '2024-03-29 06:41:12.022003', '2024-03-14 00:00:00', 1200);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (12, 31, '2024-03-07 00:00:00', 17, '2024-03-29 06:51:13.519215', '2024-03-21 00:00:00', 1820);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (13, 60, '2024-03-30 00:00:00', 23, '2024-03-30 08:27:39.073366', '2024-04-05 00:00:00', 1500);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (15, 32, '2024-05-10 00:00:00', 24, '2024-03-31 19:29:40.750662', '2024-05-20 00:00:00', 1250);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (17, 64, '2024-05-10 00:00:00', 24, '2024-03-31 19:30:14.344011', '2024-05-20 00:00:00', 200);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (18, 64, '2024-06-10 00:00:00', 24, '2024-03-31 19:30:28.28696', '2024-06-20 00:00:00', 670);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (19, 43, '2024-05-10 00:00:00', 24, '2024-03-31 19:47:00.868923', '2024-05-20 00:00:00', 200);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (27, 33, '2024-04-03 00:00:00', 25, '2024-03-31 23:50:16.491875', '2024-04-11 00:00:00', 640);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (16, 59, '2024-06-05 00:00:00', 24, '2024-03-31 19:29:55.14655', '2024-06-14 00:00:00', 200);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (26, 59, '2030-05-11 00:00:00', 24, '2024-03-31 20:24:42.914009', '2030-05-22 00:00:00', 666);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (14, 59, '2024-05-10 00:00:00', 24, '2024-03-30 08:28:59.297506', '2024-05-22 00:00:00', 3000);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (28, 59, '2024-06-09 00:00:00', 12, '2024-04-01 03:40:00.506352', '2024-06-18 00:00:00', 666);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (29, 59, '2024-07-09 00:00:00', 12, '2024-04-01 03:40:21.025139', '2024-07-18 00:00:00', 1111);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (30, 59, '2024-08-09 00:00:00', 12, '2024-04-01 03:40:31.08421', '2024-08-18 00:00:00', 555);
INSERT INTO public.reservations (id, room_id, arrival_date, client_id, created_at, departure_date, price) VALUES (31, 59, '2024-04-09 00:00:00', 26, '2024-04-03 00:17:53.396289', '2024-04-25 00:00:00', 4500);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 26, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 28, true);


--
-- Name: hotel_chains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotel_chains_id_seq', 3, true);


--
-- Name: hotels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotels_id_seq', 11, true);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 31, true);


--
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_id_seq', 68, true);


--
-- PostgreSQL database dump complete
--


-- ************************* INSERT DATA *******************************

