import bodyParser from "body-parser";
import express,  { query } from "express";
import pg  from "pg";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new pg.Client({
    host: 'localhost',
    port: '5433',
    database: 'ehotels',
    user: 'postgres',
    password: '8@9eqtd5n4cBTED!'
});
db.connect();
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, (req, res) => {
    console.log(`Listening on port : ${port}`);
});

app.get('/', (req, res) => {
    res.render('hotels-list.ejs');
});
