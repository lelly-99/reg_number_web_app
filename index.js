import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import registrationNumbers from "./factory-function/registration.js";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
// import query from "./service/query.js";

//import routes
import main from './routes/main.js'

const pgp = pgPromise();

// // should we use a SSL connection
// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//   useSSL = true;
// }
// // which db connection to use
// const connectionString =
//   process.env.DATABASE_URL ||
//   "postgres://lelly:cHkFvXlgaIdPvAue4lxbMVEkSdRsuiLh@dpg-cjad3vue546c738aonpg-a.oregon-postgres.render.com/lelly_99_greetings_with_routes?ssl=true";

// const database = pgp(connectionString);
// const data = query(database);

//factory function
const registrationFunction = registrationNumbers();

//routes
const mainRoute = main(registrationFunction)


const app = express();
app.use(
  session({
    secret: "greet",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});

app.get('/', mainRoute.getRegistration)
app.post('/', mainRoute.postRegistration)

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});
