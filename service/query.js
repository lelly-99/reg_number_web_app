const query = (db) => {
  const getReg = async () => {
    return await db.any("SELECT regNumber FROM registrations",);
  };
  const getTownId = async (town_code) => {
    return await db.oneOrNone("SELECT id FROM towns WHERE town_code = $1", [town_code]);
  };
  const insertReg = async (regNumber, townId) => {
    return await db.none("INSERT INTO registrations (regNumber, townID) VALUES ($1, $2)",
    [regNumber, townId]);
  };

  const filterRegs = async (town_code) => {
    return await db.any("SELECT registrations.regNumber FROM registrations JOIN towns ON registrations.townId = towns.id WHERE town_code = $1", [town_code])
  }
  const reset = async () => {
    await db.none("delete from registrations");
  };
  return {
    getReg,
    insertReg,
    getTownId,
    reset,
    filterRegs
  };
};
export default query;