import bodyParser from "body-parser";
import express,  { query } from "express";
import pg  from "pg";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

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

app.get('/', async (req, res) => {

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
app.get('/book', async (req, res) => {

    res.render('book-room.ejs');

});
app.get('/room', async (req, res) => {

    res.render('rooms-list.ejs');

});
/*
app.get('/', async (req, res) => {
    
    let hotelsList = await getListHotels();

    res.render('hotels-list.ejs', { data: hotelsList});
});
*/

// --------------- ** DATA ** --------------------

const hotelsListData = [];


// --------------- ** END DATA ** -----------------



// --------------- ** METHODS ** --------------------


async function getListHotels() {
    try {
        const query = `SELECT hotels.id, hotels.hotel_name, hotels.address, 
        hotels.category, hotels.hotel_chain_id, hotel_chains.icon
        FROM hotels 
        JOIN hotel_chains ON hotel_chains.id = hotels.hotel_chain_id;`;
        const results = await db.query(query);
        var hotels = [];
        if(results.rows.length > 0) {
            results.rows.forEach(result => {
                let address = extractCityCountry(result.address);
                let categoryIcon = categoryToIcon(result.category);
                let hotelChainId = result.hotel_chain_id;
                let hotel = {
                    id:result.id,
                    name:result.hotel_name,
                    location:address,
                    category:result.category,
                    categoryIcon: categoryIcon,
                    price:80,
                    chainIcon:result.icon,
                    hotelChainId:hotelChainId
                };

                hotels.push(hotel);
            });
            console.log(`Hotels list : ${JSON.stringify(hotels, null, 2)}`);
            return hotels;
        }
    } catch (error) {
        console.error("Error while querying hotels list", error.stack);
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

// --------------- ** END METHODS ** -----------------

