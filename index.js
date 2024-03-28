import bodyParser from "body-parser";
import express,  { query } from "express";
import pg  from "pg";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

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

    let reservRoomId = parseInt(currentRoomSelected.id);
    let reservArrivalDate = userArrivalDate;
    let reservDepartureDate = userDepartureDate;
    let clientId = 0;
    let reservPrice = currentStayPrice;
    res.render('rooms-list.ejs', {data:currentRoomsHotelPageData});

});

app.get('/book', async (req, res) => {

    let roomSelectedIndex = parseInt(req.query.id);
    let roomSelected = currentHotelSelected.rooms[roomSelectedIndex];
    currentRoomSelected = roomSelected;
    currentRoomId = roomSelected.id;
    let stayPrice = parseInt(currentRoomSelected.price) * numberOfNights;
    currentStayPrice = stayPrice;
    currentPersonString = getPersonString(currentRoomSelected.capacity);
    console.log(`Room object: ${JSON.stringify(currentRoomSelected, null, 2)}`);
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
app.get('/clerk-confirm', async (req, res) => {

    res.render('clerk-confirm-client.ejs');

});

app.get('/clerk-book', async (req, res) => {

    res.render('clerk-book-room.ejs');

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
let currentRoomId = 0;
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

async function createClient(clientData) {
    
    let fullAddress = `${clientData.streetName}, ${clientData.city}, ${clientData.country}, ${clientData.zipCode}`;
    let hashPwd = await hashPassword(clientData.pwd);
    console.log(`client pwd : ${clientData.pwd}`);
    console.log(`client hashed pwd : ${hashPwd}`);
    
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
        console.log("New client ID: ", newClientId);

    } catch (error) {
        console.error("Error inserting new client:", error.message);
    }
}

function getPersonString(roomCapacity) {
    return roomCapacity == 1 ? 'personne' : 'personnes';
}
function getNightString(numberOfNights) {
    return numberOfNights == 1 ? 'nuit' : 'nuits';
}

// query to select highest price room for hotel id
/*
select * from rooms
where hotel_id = 11
order by price DESC;
*/

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

async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            console.log('Passwords match');
        } else {
            console.log('Passwords do not match');
        }
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
    }
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// --------------- ** METHODS ** -----------------


