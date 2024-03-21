import bodyParser from "body-parser";
import express,  { query } from "express";
import { pg } from "pg";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
