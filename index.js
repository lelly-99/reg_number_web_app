// import express from "express";
// import { engine } from "express-handlebars";
// import bodyParser from "body-parser";
// import registrationNumbers from "./factory-function/registration.js";
// import flash from "connect-flash";
// import session from "express-session";
// import pgPromise from "pg-promise";
// import query from "./service/query.js";

// //import routes
// import main from './routes/main.js'

// const pgp = pgPromise();

// // should we use a SSL connection
// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//   useSSL = true;
// }
// // which db connection to use
// const connectionString =
//   process.env.DATABASE_URL ||
//   "postgres://otzyymfe:0lGTbqnyGfXApYOVD2IceTfouyXP0oxi@silly.db.elephantsql.com/otzyymfe?ssl=true"

// const database = pgp(connectionString);
// const data = query(database);

// //factory function
// const registrationFunction = registrationNumbers();
// //route
// const mainRoute = main(registrationFunction, data)

// const app = express();
// app.use(
//   session({
//     secret: "greet",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(flash());
// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./views");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.locals.messages = req.flash();
//   next();
// });

// app.get('/', mainRoute.getRegistration)
// app.post('/', mainRoute.postRegistration)
// app.get('/reg_number/:registrationNumber', async (req, res) => {
//   try {
//     const registrationNumber = req.params.registrationNumber;
//     // Implement a function to retrieve and display registration numbers by registration number
//     // You can use a query like: SELECT registration_plate FROM registration_numbers WHERE registration_plate = $1
//     const registrations = await data.getRegistrationByNumber(registrationNumber);
//     res.render("index", { registrations });
//   } catch (err) {
//     console.log("Error:", err);
//     // Handle errors gracefully, e.g., render an error page
//   }
// });
// app.post('/reg_number', async (req, res) => {
//   try {
//     const townCode = req.body.town;
//     const townId = await data.selectTowns(townCode);
//     if (townId) {
//       const registrations = await data.filterByTown(townId);
//       res.render("index", { registrations });
//     } else {
//       // Handle the case where the town code is invalid
//       console.log("Invalid town code:", townCode);
//       res.redirect("/");
//     }
//   } catch (err) {
//     console.log("Error:", err);
//     // Handle errors gracefully, e.g., render an error page
//   }
// });

// // app.post('/town', mainRoute.getTown)

// const PORT = process.env.PORT || 3007;
// app.listen(PORT, function () {
//   console.log("App started at port:", PORT);
// });

import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import pgPromise from "pg-promise";
import query from "./service/query.js";
import registrationNumbers from "./factory-function/registration.js";


// Import routes
import main from './routes/main.js'

const pgp = pgPromise();

// Should we use an SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
// Which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://otzyymfe:0lGTbqnyGfXApYOVD2IceTfouyXP0oxi@silly.db.elephantsql.com/otzyymfe?ssl=true"

const database = pgp(connectionString);
const data = query(database);

// Factory function
const registrationFunction = registrationNumbers();
// Routes
const mainRoute = main(registrationFunction, data)

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
app.get('/reg_number/:registrationNumber', async (req, res) => {
  try {
    const registrationNumber = req.params.registrationNumber;
    const registrations = await data.getRegistrationByNumber(registrationNumber);
    res.render("index", { registrations });
  } catch (err) {
    console.log("Error:", err);
  }
});
app.post('/reg_number', async (req, res) => {
  try {
    const townCode = req.body.town;
    const townId = await data.selectTowns(townCode);
    if (townId) {
      const registrations = await data.filterByTown(townId);
      res.render("index", { registrations });
    }
  } catch (err) {
    console.log("Error:", err);
  }
});
app.post("/reset", mainRoute.reset);

const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});




