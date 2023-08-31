const query = (db) => {
  const getReg = async () => {
    return await db.any("SELECT regNumber FROM registrations",);
  };
  //get id for town
  const getTownId = async (town_code) => {
    await db.oneOrNone("SELECT id FROM towns WHERE town_code = $1", [town_code]);
  };
  //insert reg number with its respective town code
  const insertReg = async (regNumber, town_code) => {
    const insert = await getTownId(town_code);
    return await db.none("INSERT INTO registrations (regNumber, townID) VALUES ($1, $2)",
    [regNumber, insert]);
    // const townId = await getTownId(town_code);
    // if (townId !== null) {
    //   return await db.none(
    //     "INSERT INTO registrations (regNumber, townID) VALUES ($1, $2)",
    //     [regNumber, townId]
    //   );
    // } 
  };

  const reset = async () => {
    await db.none("delete from registrations");
  };

  return {
    getReg,
    insertReg,
    getTownId,
    reset,
  };
};
export default query;
