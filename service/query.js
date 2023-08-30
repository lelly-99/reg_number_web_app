// const query = (db) => {
//   const insertReg = async (registration, townId) => {
//     await db.none(
//       "insert into registration_numbers (registration_plate, town_id) values ($1, $2)",
//       [registration, townId]
//     );
//   };
//   // Modify your selectTowns function to return the integer id
// const selectTowns = async (townCode) => {
//   const result = await db.oneOrNone("SELECT id FROM towns WHERE town_code = $1", [townCode]);
//   return result ? result.id : null;
// };

  
//   const filterByTown = async (townId) => {
//     return await db.manyOrNone(
//       "SELECT registration_plate FROM registration_numbers WHERE town_id = $1",
//       [townId]
//     );
//   };

//   const insertRegistrationWithTown = async (registration, townId) => {
//     try {
//       await db.none(
//         "INSERT INTO registration_numbers (registration_plate, town_id) VALUES ($1, $2)",
//         [registration, townId]
//       );
//     } catch (error) {
//       throw error;
//     }
//   };
  
  
//   const getRegistrationByNumber = async (registrationNumber) => {
//     return await db.manyOrNone(
//       "SELECT registration_plate FROM registration_numbers WHERE registration_plate = $1",
//       [registrationNumber]
//     );
//   };
  
//   return {
//     insertReg,
//     selectTowns,
//     filterByTown,
//     insertRegistrationWithTown,
//     getRegistrationByNumber
//   };
// };

// export default query;

// const query = (db) => {
//   const insertReg = async (registration, townId) => {
//       await db.none(
//           "insert into registration_numbers (registration_plate, town_id) values ($1, $2)",
//           [registration, townId]
//       );
//   };

//   // Modify your selectTowns function to return the integer id
//   const selectTowns = async (townCode) => {
//       const result = await db.oneOrNone("SELECT id FROM towns WHERE town_code = $1", [townCode]);
//       return result ? result.id : null;
//   };

//   const filterByTown = async (townId) => {
//       return await db.manyOrNone(
//           "SELECT registration_plate FROM registration_numbers WHERE town_id = $1",
//           [townId]
//       );
//   };

//   const insertRegistrationWithTown = async (registration, townId) => {
//       try {
//           await db.none(
//               "INSERT INTO registration_numbers (registration_plate, town_id) VALUES ($1, $2)",
//               [registration, townId]
//           );
//       } catch (error) {
//           throw error;
//       }
//   };

//   const getRegistrationByNumber = async (registrationNumber) => {
//       return await db.manyOrNone(
//           "SELECT registration_plate FROM registration_numbers WHERE registration_plate = $1",
//           [registrationNumber]
//       );
//   };

//   return {
//       insertReg,
//       selectTowns,
//       filterByTown,
//       insertRegistrationWithTown,
//       getRegistrationByNumber
//   };
// };

// export default query;

const query = (db) => {
  const insertReg = async (registration) => {
    const townCode = registration.substring(0, 2); // Extract town_code from registration_plate
    const townId = await selectTowns(townCode);
    if (townId) {
      await db.none(
        "INSERT INTO registration_numbers (registration_plate, town_code, town_id) VALUES ($1, $2, $3)",
        [registration, townCode, townId]
      );
    } else {
      throw new Error("Town not found for registration plate.");
    }
  };

  const selectTowns = async (townCode) => {
    const result = await db.oneOrNone("SELECT id FROM towns WHERE town_code = $1", [townCode]);
    return result ? result.id : null;
  };

  const filterByTown = async (townId) => {
    return await db.manyOrNone(
      "SELECT registration_plate FROM registration_numbers WHERE town_id = $1",
      [townId]
    );
  };

  const getRegistrationByNumber = async (registrationNumber) => {
    return await db.manyOrNone(
      "SELECT registration_plate FROM registration_numbers WHERE registration_plate = $1",
      [registrationNumber]
    );
  };

  const getAllRegistrations = async () => {
    return await db.manyOrNone("SELECT registration_plate FROM registration_numbers");
  };

  const reset = async () => {
    await db.none("delete from registration_numbers");
  };

  return {
    insertReg,
    selectTowns,
    filterByTown,
    getRegistrationByNumber,
    getAllRegistrations,
    reset,
  };
};

export default query;

