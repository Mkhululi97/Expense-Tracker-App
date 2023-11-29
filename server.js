/* ##### BRING IN EXPRESS ##### */
import express from "express";
/* ##### BRING IN HANDLEBARS ##### */
import { engine } from "express-handlebars";
/* ##### BRING IN BOBYPARSER ##### */
import bodyParser from "body-parser";
/* ##### BRING IN EXPRESS-FLASH ##### */
import flash from "express-flash";
/* ##### BRING IN EXPRESS-SESSION ##### */
import session from "express-session";
/* ##### BRING IN SERVICES FUNCTION ##### */
import Expense from "./services/expense.js";
import routes from "./routes/expenseRoute.js";
/* -------------------- ALL INSTANCES -------------------- */

/* INITIALIZE EXPRESS */
const app = express();
/* INITIALIZE FACTORY FUNCTION */
const expenseServices = Expense();
/* INITIALIZE ROUTES FUNCTION */
const expenseRoute = routes(expenseServices);

/* -------------------- ALL INSTANCES -------------------- */
/* -------------------- SETUP ENGINE -------------------- */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

/* -------------------- GET ACCESS TO OUR STATIC FILES -------------------- */
app.use(express.static("public"));

/* -------------------- USE BODY PARSER -------------------- */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/* -------------------- USE BODY PARSER -------------------- */

/* -------------------- USE SESSION MIDDLEWARE -------------------- */
app.use(
  session({
    secret: "mkhululicoder",
    resave: true,
    saveUninitialized: true,
  })
);

/* -------------------- USE FLASH MIDDLEWARE -------------------- */
app.use(flash());
/* -------------------- ALL ROUTES -------------------- */
app.get("/", expenseRoute.home);
app.get("/expense", expenseRoute.expense);
/* -------------------- ALL ROUTES -------------------- */

// CREATE PORT VARIABLE
const PORT = process.env.PORT || 3010;
// GET NOTIFIED WHEN APP STARTS SUCCESSFULLY
app.listen(PORT, function () {
  console.log(`app started on port: ${PORT}`);
});
