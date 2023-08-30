// export default function main(registrationFunction, data) {
//   async function getRegistration(req, res) {
//     try {
//       res.render("index");
//     } catch (err) {
//       console.log("error", err);
//     }
//   }
 

// // Handle the POST request for adding a registration
// async function postRegistration(req, res) {
//   try {
//     const registration = req.body.registration_plate; // Make sure it matches the input field name
//     const townCode = req.body.town;

//     // Retrieve the town ID for the given town code
//     const town = await data.selectTowns(townCode);

//     if (!town) {
//       console.log("Invalid town code:", townCode);
//       res.redirect("/");
//       return;
//     }

//     if (registration) {
//       await data.insertRegistrationWithTown(registration, town.id);
//       await data.filterByTown(townCode)
//       res.redirect("/");
//     } else {
//       // Handle the case where the registration plate is empty
//       res.redirect("/");
//     }
//   } catch (err) {
//     console.log("Error", err);
//     res.redirect("/");
//   }
// }

//   return {
//     postRegistration,
//     getRegistration,
//   };
// }

// export default function main(registrationFunction, data) {
//   async function getRegistration(req, res) {
//       try {
//           res.render("index");
//       } catch (err) {
//           console.log("error", err);
//       }
//   }

//   async function postRegistration(req, res) {
//       try {
//           const registration = req.body.registration_plate;
//           let townCode = req.body.town; // Define townCode here

//           // Ensure that townCode is a string and not empty
//           townCode = typeof townCode === 'string' ? townCode.trim() : '';

//           // Check if townCode is empty or invalid
//           if (!townCode) {
//               console.log("Invalid town code:", townCode);
//               res.redirect("/");
//               return;
//           }

//           const town = await data.selectTowns(townCode);

//           if (!town) {
//               console.log("Invalid town code:", townCode);
//               res.redirect("/");
//               return;
//           }

//           if (registration) {
//               await data.insertRegistrationWithTown(registration, town.id);
//               const registrations = await data.filterByTown(town.id);
//               res.render("index", { registrations });
//           } else {
//               // Handle the case where the registration plate is empty
//               res.redirect("/");
//           }
//       } catch (err) {
//           console.log("Error", err);
//           res.redirect("/");
//       }
//   }

//   return {
//       postRegistration,
//       getRegistration,
//   };
// }
export default function main(registrationFunction, data) {
  async function getRegistration(req, res) {
    try {
      const registrations = await data.getAllRegistrations();
      res.render("index", { registrations });
    } catch (err) {
      console.log("Error:", err);
    }
  }

  async function postRegistration(req, res) {
    try {
      const registration = req.body.registration_plate.toUpperCase();
      const error = registrationFunction.errorMessage(registration);
  
      if (error) {
        // Validation error, flash the error message and redirect
        req.flash('error', error);
        res.redirect("/");
      } else if (registration) {
        // Check if the registration already exists in the database
        const existingRegistrations = await data.getRegistrationByNumber(registration);
        if (existingRegistrations.length > 0) {
          // Registration already exists, display an error
          req.flash('error', 'Registration already exists');
          res.redirect("/");
        } else {
          // Registration is valid and doesn't exist, proceed with insertion
          await data.insertReg(registration);
          const registrations = await data.filterByTown(registration.substring(0, 2));
          res.render("index", { registrations });
        }
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log("Error", err);
      res.redirect("/");
    }
  }
  async function reset(req, res) {
    try {
      await data.reset();
      res.redirect('/');
    } catch (err) {
      console.log('Error reseting app', err)
  }
  }

  

  return {
    postRegistration,
    getRegistration,
    reset
  };
}








