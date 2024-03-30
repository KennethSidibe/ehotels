import bodyParser from "body-parser";
import express,  { query } from "express";
import pg  from "pg";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { error } from "console";

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ehotels",
  password: "8@9eqtd5n4cBTED!",
  port: 5433
});
db.connect();

const port = 3000;

const hotel1 = {
    id: 10,
    name: "Sables de Saaba",
    location: "Ouagadougou, Burkina Faso",
    category: 'luxe',
    icon: '😎',
    price: 200,
    chainIcon: '👑'
}

const hotel2 = {
    id: 1,
    name: "Poussières, l'hôtel",
    location: "Dédougou, Burkina Faso",
    category: 'Éco',
    categoryIcon: '😙',
    price: 80,
    chainIcon: '🦉'
}

const data = [
    hotel1,
    hotel2
];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, (req, res) => {
    console.log(`Listening on port : ${port}`);
});

// ---------------- ROUTES ---------------------

app.get('/', async (req, res) => {

    res.render( 'keto/index.ejs');

});

app.get('/hotel-rooms', async (req, res) => {

    let hotelSelectedIndex = parseInt(req.query.id);
    let hotelObjectSelected = hotelsListData[hotelSelectedIndex];

    currentHotelId = hotelSelectedIndex;
    currentHotelChainId = hotelObjectSelected.hotel_chain_id;
    currentHotelSelected = hotelObjectSelected;
    
    let recommendedRoomPrice = parseInt(hotelObjectSelected.price);
    let stayPrice = recommendedRoomPrice * numberOfNights;
    currentStayPrice = stayPrice;

    let hotelData = {
        hotel:hotelObjectSelected,
        stayPrice:stayPrice,
        stay:currentStay,
        numberOfNights:numberOfNights
    };
    currentRoomsHotelPageData = hotelData;

    res.render('rooms-list.ejs', {data:currentRoomsHotelPageData});

});
app.post('/create-reserv', async (req, res) => {

    let userFirstName = req.body.firstName;
    let userLastName = req.body.lastName;
    let userEmail = req.body.email;
    let userPwd = req.body.pwd;
    let userPhoneNumber = req.body.phoneNumber;
    let userStreetName = req.body.streetName;
    let userCity = req.body.city;
    let userCountry = req.body.country;
    let userZipCode = req.body.zipCode;

    let clientData = {
        firstName: userFirstName,
        lastName:userLastName,
        email:userEmail,
        phoneNumber:userPhoneNumber,
        pwd:userPwd,
        streetName:userStreetName,
        city:userCity,
        country:userCountry,
        zipCode:userZipCode
    }

    console.log(`New Client Data: ${JSON.stringify(clientData, null, 2)}`);

    let newClientId = await createClient(clientData);
    currentClientId = newClientId;

    let reservRoomId = parseInt(currentRoomSelected.id);
    let reservArrivalDate = userArrivalDate;
    let reservDepartureDate = userDepartureDate;
    let reservPrice = currentStayPrice;
    let reservationData = {
        roomId: reservRoomId,
        arrivalDateInsert: reservArrivalDate,
        departureDateInsert: reservDepartureDate,
        clientId: currentClientId,
        stayPrice: reservPrice
    };

    let newReservationId = await createReservation(reservationData);
    currentReservationId = newReservationId;

    res.redirect('/?successful');

});

app.get('/book', async (req, res) => {

    let roomSelectedIndex = parseInt(req.query.id);
    let roomSelected = currentHotelSelected.rooms[roomSelectedIndex];
    currentRoomSelected = roomSelected;
    currentRoomId = roomSelected.id;
    let stayPrice = parseInt(currentRoomSelected.price) * numberOfNights;
    currentStayPrice = stayPrice;
    currentPersonString = getPersonString(currentRoomSelected.capacity);

    let bookPageData = {
        hotelName:currentHotelSelected.name,
        roomName:currentRoomSelected.room_name,
        hotelLocation:currentHotelSelected.location,
        arrivalDateString:currentArrivalDateString,
        departureDateString:currentDepartureDateString,
        numberOfNights:numberOfNights,
        nightString:currentNightString,
        roomCapacity:currentRoomSelected.capacity,
        roomPersonString:currentPersonString,
        roomPrice:currentRoomSelected.price,
        stayPrice: stayPrice
    }

    res.render('book-room.ejs',{data:bookPageData});

});

app.get('/login', async(req, res) => {
    res.render('user-login.ejs');
});

app.post('/login', async(req, res) => {
    const email = (req.body.email);
    const pwd = (req.body.pwd);

    let client = await verifyLoginEmail(email);
    let isPwdValid = await verifyPassword(pwd, client.pwd);
    if (client.length <= 0 || !isPwdValid) {
        console.log('Failed to log in, pwd dont match');
        res.redirect('/login?unsuccessful');
    } 

    console.log("Client logged succesfully");
    currentLoggedClientData = client;
    res.render('user-profile.ejs', {data:currentLoggedClientData});
    
});

app.post('/rooms', async (req, res) => {

    userArrivalDate = req.body.arrivalDate;
    userDepartureDate = req.body.departureDate;
    numberOfNights = countNumberOfDays(userArrivalDate, userDepartureDate);
    currentStay = formatRangeToShortString(userArrivalDate, userDepartureDate);
    currentArrivalDateString = formatDateToFullDay(userArrivalDate);
    currentDepartureDateString = formatDateToFullDay(userDepartureDate);
    currentNightString = getNightString(numberOfNights);

    let hotelsList = await getListHotels();
    hotelsList['stay'] = currentStay;
    
    hotelsListData = hotelsList;

    res.render('hotels-list.ejs', {data:hotelsListData});

});

app.get('/pick-date', async (req, res) => {

    res.render( 'pick-reservation-date.ejs');

});

app.get('/about', async (req, res) => {

    res.render( 'keto/about.ejs');

});
app.get('/gallery', async (req, res) => {

    res.render( 'keto/gallery.ejs');

});
app.get('/room', async (req, res) => {

    res.render( 'keto/room.ejs');

});
app.get('/contact', async (req, res) => {

    res.render( 'keto/contact.ejs');

});
app.get('/hotel-reserv-details', async (req, res) => {

    res.render('hotel-reservation-details.ejs');

});
app.get('/hotel-reservations', async (req, res) => {

    res.render('hotel-reservations.ejs');

});
app.get('/hotel-add-employee', async (req, res) => {

    res.render('hotel-add-employees.ejs');

});
app.get('/hotel-modify-room', async (req, res) => {

    res.render('hotel-modify-room.ejs');

});
app.get('/hotel-add-room', async (req, res) => {

    res.render('hotel-add-room.ejs');

});

app.get('/hotel-adm', async (req, res) => {

    res.render('hotel-admin.ejs');

});
app.get('/modify-employee', async (req, res) => {

    res.render('modify-employee-profile.ejs');

});
app.get('/employee', async (req, res) => {

    res.render('employee-profile.ejs');

});

app.get('/clerk-book', async (req, res) => {

    let clerkHotelData = await getHotelData(10);

    clerkCurrentHotelData = clerkHotelData;

    console.log(`Clerk hotel data: ${JSON.stringify(clerkCurrentHotelData, null, 2)}`);

    res.render('clerk-book-room.ejs', {data:clerkCurrentHotelData});

});
app.post('/clerk-create-reserv', async (req, res) => {

    let newClientId = await createClient(clerkBookClientData);
    clerkBookReservationData['clientId'] = newClientId;

    console.log(`New client created: ${newClientId}`);

    let newReservationId = await createReservation(clerkBookReservationData);
    currentReservationId = newReservationId;

    console.log(`New reservation created: ${currentReservationId}`);

    res.redirect('/?successful');

});

app.post('/clerk-confirm', async (req, res) => {

    let userFirstName = req.body.firstName;
    let userLastName = req.body.lastName;
    let userEmail = req.body.email;
    let userPwd = req.body.pwd;
    let userPhoneNumber = req.body.phoneNumber;
    let userStreetName = req.body.streetName;
    let userCity = req.body.city;
    let userCountry = req.body.country;
    let userZipCode = req.body.zipCode;
    let userFullAddress = `${userStreetName}, ${userCity}, ${userCountry}, ${userZipCode}`;

    let clientData = {
        firstName: userFirstName,
        lastName:userLastName,
        email:userEmail,
        phoneNumber:userPhoneNumber,
        pwd:userPwd,
        streetName: userStreetName,
        city: userCity,
        zipCode: userZipCode,
        address: userFullAddress,
    };
    
    clerkBookClientData = clientData;

    let hotelName = clerkCurrentHotelData.hotel_name;
    let hotelLocation = clerkCurrentHotelData.address;
    let reservRoomSelectedId = parseInt(req.body.roomId);
    let reservRoomId = parseInt(clerkCurrentHotelData.rooms[reservRoomSelectedId].id);   
    let reservRoomPrice = parseInt(clerkCurrentHotelData.rooms[reservRoomSelectedId].price);
    let reservRoomCapacity = parseInt(clerkCurrentHotelData.rooms[reservRoomSelectedId].capacity);
    let reservRoomName = clerkCurrentHotelData.rooms[reservRoomSelectedId].room_name;
    
    let reservArrivalDate = req.body.arrivalDate;
    let reservDepartureDate = req.body.departureDate;
    let numberOfNights = countNumberOfDaysWithDashes(reservArrivalDate, reservDepartureDate);
    
    let arrivalDateFullDay = formatDateWithDashToFullDay(reservArrivalDate);
    let departureDateFullDay = formatDateWithDashToFullDay(reservDepartureDate);
    let nightString = capitalizeFirstLetter(getNightString(numberOfNights));
    let personString = capitalizeFirstLetter(getPersonString(reservRoomCapacity));
    let stayPrice = reservRoomPrice * numberOfNights;

    let reservationData = {
        hotelName:hotelName,
        hotelLocation:hotelLocation,
        roomId: reservRoomId,
        reservArrivalDate: arrivalDateFullDay,
        reservDepartureDate: departureDateFullDay,
        arrivalDateInsert: convertDateForDbInsert(replaceDashesWithSlashes(reservArrivalDate)),
        departureDateInsert: convertDateForDbInsert(replaceDashesWithSlashes(reservDepartureDate)),
        numberOfNights: numberOfNights,
        roomPrice: reservRoomPrice,
        stayPrice:stayPrice,
        capacity:reservRoomCapacity,
        nightString:nightString,
        personString:personString
    };

    clerkBookReservationData = reservationData;

    res.render('clerk-confirm-client.ejs', {clientData:clerkBookClientData, reservData:clerkBookReservationData});

});
app.get('/reserv-details', async (req, res) => {

    res.render('reservation-details.ejs');

});
app.get('/reservations', async (req, res) => {

    res.render('user-reservations.ejs');

});
app.get('/hotels', async (req, res) => {

    let hotelsList = await getListHotels();

    res.render('hotels-list.ejs', { data: hotelsList});

});
app.get('/modify', async (req, res) => {

    res.render('modify-profile.ejs');

});
app.get('/user', async (req, res) => {

    res.render('user-profile.ejs');

});

app.get('/room', async (req, res) => {

    res.render('rooms-list.ejs');

});

// ---------------- ROUTES ---------------------


app.get('/rooms', async (req, res) => {
    
    let hotelsList = await getListHotels();
    hotelsListData = hotelsList;

    res.render('hotels-list.ejs', { data: hotelsList});
});


// --------------- ** DATA ** --------------------

let hotelsListData = [];
let userArrivalDate = '';
let userDepartureDate = '';
let numberOfNights = 0;
let currentHotelChainId = 0;
let currentHotelId = 0;
let currentReservationId = 0;
let currentRoomId = 0;
let currentClientId = 0;
let currentStay = '';
let currentStayPrice = 0;
let currentPersonString = '';
let currentNightString = '';
let currentArrivalDateString = '';
let currentDepartureDateString = '';
let currentHotelSelected = {};
let recommendRoomSelected = {};
let currentRoomSelected = {};
let currentRoomsHotelPageData = {};
let testClientData = {
    firstName:'Ken',
    lastName: 'Kouadio',
    streetName: '203 rue des boss',
    city: 'Ouaga',
    country: 'Burkina Faso',
    zipCode: 'A9V 8Z8',
    email: 'kenkoua@gmail.com',
    phoneNumber:'+22670078008',
    pwd: '1234567890'
};
let testReservationData = {
    roomId: 32,
    arrivalDateInsert: "08/03/2024",
    departureDateInsert: "10/03/2024",
    clientId: 3,
    stayPrice: 200
};
// Clerk Booking Data
let clerkBookClientData = {};
let clerkBookReservationData = {};
let clerkConfirmDetails = {};
let clerkCurrentHotelData = {};
// Clerk Booking Data

// User Logged Data
let currentLoggedClientData = {};
// User Logged Data

// --------------- ** DATA ** -----------------


// --------------- ** METHODS ** --------------------

async function getHotelRooms(hotelId) {
    try {
        const query = `select * from rooms
        where hotel_id = $1
        order by price DESC;`;
        
        const results = await db.query(query, [hotelId]);
        if(results.rows.length > 0 ){
            let rooms = results.rows;
            return rooms;
        }
    } catch (error) {
        console.error("Error while querying hotels list", error.stack);
    }
}

async function getHotelData(hotelId) {
    const hotelQuery = 'SELECT * from hotels WHERE id = $1';
    const hotelParamValues = [hotelId];

    try {
        const hotelResult = await db.query(hotelQuery, hotelParamValues);
        const hotelRooms = await getHotelRooms(hotelId);
        if(hotelResult.rows.length > 0 && hotelRooms.length > 0) {
            console.log(`test getting Hotel Data: ${JSON.stringify(hotelResult.rows, null, 2)}`);
            console.log(`test getting RoomHotels Data: ${JSON.stringify(hotelRooms, null, 2)}`);
            let hotelData = hotelResult.rows[0];
            hotelData["rooms"] = hotelRooms;
            return hotelData;
        }
    } catch (error) {
        console.error("Error while querying hotel data: ", error.stack);
        throw error;
    }
}

async function createClient(clientData) {
    
    let fullAddress = `${clientData.streetName}, ${clientData.city}, ${clientData.country}, ${clientData.zipCode}`;
    let hashPwd = await hashPassword(clientData.pwd);
    
    const query = `insert into clients (first_name, last_name, 
        address, email, phone_number, pwd)
    values(
        $1, $2, 
        $3, $4, $5, $6
    )
    RETURNING id;`
    const paramValues = [
        clientData.firstName, clientData.lastName, 
        fullAddress, clientData.email, clientData.phoneNumber, hashPwd
    ];

    try {
        const result = await db.query(query,paramValues);
        const newClientId = result.rows[0].id; 
        if(typeof(newClientId) === 'number'){
            return parseInt(newClientId);
        } else {
            console.error("Error inserting new client:", error.message);
            throw error;
        }

    } catch (error) {
        console.error("Error inserting new client:", error.message);
    }
}

async function loginUser(userData) {
    // if()
    console.log('hello');
}

async function createReservation(reservationData) {
    let roomId = parseInt(reservationData.roomId);
    let arrivalDateInsert =  convertDateForDbInsert(reservationData.arrivalDateInsert);
    let departureDateInsert =  convertDateForDbInsert(reservationData.departureDateInsert);
    let clientId = parseInt(reservationData.clientId);
    let price = parseInt(reservationData.stayPrice);

    console.log(`arrival Date inside create meth: ${arrivalDateInsert}`);
    console.log(`departure Date inside create meth: ${departureDateInsert}`);


    const query = `INSERT INTO reservations (room_id, arrival_date, client_id, 
        departure_date, price)
        VALUES(
        $1, $2, $3,
        $4, $5
        )
        RETURNING id;`
    const paramValues = [roomId, arrivalDateInsert, clientId, departureDateInsert, price];

    try {
        let result = await db.query(query, paramValues);
        if(typeof(result.rows[0].id) === 'number') {
            return parseInt(result.rows[0].id);
        }
    } catch (error) {
        console.error(`Error while inserting new reservations : ${error.stack}`);
        throw error;
    }

}

function getPersonString(roomCapacity) {
    return roomCapacity == 1 ? 'personne' : 'personnes';
}
function getNightString(numberOfNights) {
    return numberOfNights == 1 ? 'nuit' : 'nuits';
}

async function getListHotels() {
    try {
        const query = `SELECT hotels.id, hotels.hotel_name, hotels.address, 
        hotels.category, hotels.hotel_chain_id, hotel_chains.icon
        FROM hotels 
        JOIN hotel_chains ON hotel_chains.id = hotels.hotel_chain_id;`;
        const results = await db.query(query);
        var hotels = [];
        if (results.rows.length > 0) {
            // Use map to transform rows into promises
            const hotelPromises = results.rows.map(async (result) => {
                let shortAddress = extractCityCountry(result.address);
                let categoryIcon = categoryToIcon(result.category);
                let hotelChainId = result.hotel_chain_id;
                let rooms = await getHotelRooms(parseInt(result.id));
                let recommendedRoomPrice = rooms[0].price;

                return {
                    id: result.id,
                    name: capitalizeFirstLetter(result.hotel_name),
                    locationShort: shortAddress,
                    rooms: rooms,
                    location: result.address,
                    category: capitalizeFirstLetter(result.category),
                    categoryIcon: categoryIcon,
                    price: recommendedRoomPrice,
                    chainIcon: result.icon,
                    hotelChainId: hotelChainId
                };
            });

            // Wait for all promises to resolve
            return await Promise.all(hotelPromises);
        }
        return []; // Return an empty array if no results
    } catch (error) {
        console.error("Error while querying hotels list", error.stack);
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword; // This line is crucial.
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // It's good practice to re-throw the error or handle it appropriately
    }
}

function replaceDashesWithSlashes(dateString) {
    return dateString.replace(/-/g, '/');
}

async function verifyLoginEmail(email) {
    const query = 'select * from clients where email = $1';
    const paramValues = [email.toLowerCase()];

    try {
        let result = await db.query(query, paramValues);
        if(result.rows.length > 0) {
            console.log("Client exists");
            return result.rows[0];
        } else {
            console.log('Email is invalid');
            return [];
        }
    } catch (error) {
        console.error("Error while querying clients for login", error.stack);
        throw error;
        return [];
    }

}

async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        // if (match) {
        //     console.log('Passwords match');
        // } else {
        //     console.log('Passwords do not match');
        // }
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
    }
}
let testHashPwd = await hashPassword('1234567890');
let testVerifPwd = await verifyPassword('123456790', '$2b$10$sXG30jHjz.KXOfqVPkoVyerRFsLs.6lZYoKHCJRzzwBzPbI81dONC');

function convertDateForDbInsert(dateString) {
    const parts = dateString.split("/");
    // Assuming dateString is in DD/MM/YYYY format
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    // Convert to YYYY-MM-DD format
    const isoString = `${year}/${month}/${day}`;
    return isoString;
}

function categoryToIcon(category) {
    let icon = '';
    switch (category.toLowerCase()) {
        case "relaxation":
            icon = '🪭';
            break;
        case 'éco':
            icon = '🪛';
            break;
        case 'travail':
            icon = '💼';
            break;
        case 'luxe':
            icon = '💸';
            break;
        case 'royal':
            icon = '💎';
            break;
        case 'vacances':
            icon = '🌴';
            break;
        case 'palabres':
            icon = '😡';
            break;
        default:
            icon = '🏨';
            break;
    }

    return icon;
}

function extractCityCountry(hotelAddress) {
  const parts = hotelAddress.split(',');
  
  const city = parts[parts.length - 3].trim();
  const country = parts[parts.length - 2].trim();
  
  // Return the city and country concatenated together
  return `${city}, ${country}`;
}

function countNumberOfDays(arrivalDate, departureDate){
    // Parse the input strings to create Date objects
    const [arrivalDay, arrivalMonth, arrivalYear] = arrivalDate.split('/');
    const [departureDay, departureMonth, departureYear] = departureDate.split('/');
    
    // Note: Months are 0-indexed in JavaScript Date, so subtract 1
    const arrival = new Date(arrivalYear, arrivalMonth - 1, arrivalDay);
    const departure = new Date(departureYear, departureMonth - 1, departureDay);
    
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = departure - arrival;
    
    // Convert milliseconds to days (1000 milliseconds in a second, 60 seconds in a minute,
    // 60 minutes in an hour, 24 hours in a day)
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    
    return parseInt(differenceInDays);
}

function countNumberOfDaysWithDashes(arrivalDate, departureDate){
    // Parse the input strings to create Date objects
    const [arrivalYear, arrivalMonth, arrivalDay] = arrivalDate.split('-');
    const [departureYear, departureMonth, departureDay] = departureDate.split('-');
    
    // Note: Months are 0-indexed in JavaScript Date, so subtract 1
    const arrival = new Date(arrivalYear, arrivalMonth - 1, arrivalDay);
    const departure = new Date(departureYear, departureMonth - 1, departureDay);
    
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = departure - arrival;
    
    // Convert milliseconds to days (1000 milliseconds in a second, 60 seconds in a minute,
    // 60 minutes in an hour, 24 hours in a day)
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    
    return parseInt(differenceInDays);
}

function formatRangeToShortString(arrivalDate, departureDate) {
    const monthNames = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"];

    // Parse the arrival date
    const [arrivalDay, arrivalMonth, arrivalYear] = arrivalDate.split('/');
    const arrival = new Date(arrivalYear, arrivalMonth - 1, arrivalDay);
    const formattedArrival = `${parseInt(arrivalDay)} ${monthNames[arrival.getMonth()]}`;

    // Parse the departure date
    const [departureDay, departureMonth, departureYear] = departureDate.split('/');
    const departure = new Date(departureYear, departureMonth - 1, departureDay);
    const formattedDeparture = `${parseInt(departureDay)} ${monthNames[departure.getMonth()]}`;

    return `${formattedArrival} - ${formattedDeparture}`;
}
function formatDateToFullDay(dateString) {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dayNames = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    // Parse the departure date
    const [day, month, year] = dateString.split('/');
    const dayDate = new Date(year, month - 1, day);
    const formattedDate = `${dayNames[dayDate.getDay()]} ${parseInt(day)} ${monthNames[dayDate.getMonth()]}`;

    return formattedDate;
}
function formatDateWithDashToFullDay(dateString) {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dayNames = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    // Parse the departure date
    const [year, month, day] = dateString.split('-');
    const dayDate = new Date(year, month - 1, day);
    const formattedDate = `${dayNames[dayDate.getDay()]} ${parseInt(day)} ${monthNames[dayDate.getMonth()]}`;

    return formattedDate;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// --------------- ** METHODS ** -----------------


