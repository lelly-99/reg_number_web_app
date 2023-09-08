export default function main(registrationFunction, data) {
  async function getRegistration(req, res) {
    try {
      const registrations = await data.getReg();
      res.render("index", { registrations });
    } catch (err) {
      console.log("error", err);
    }
  }
  async function postRegistration(req, res) {
    try {
      const registrations = req.body.registration.toUpperCase();
      const townId = await data.getTownId(registrationFunction.getCode(registrations))
      const error = registrationFunction.errorMessage(registrations)
      const exist = registrationFunction.existReg()
      if(error){
        req.flash('error', error)
      }else if(exist){
        req.flash('error', exist)
      }else {
        await data.insertReg(registrations, townId.id)
      }
      res.redirect("/");
    } catch (err) {
      console.log("Error", err);
    }
  }
  async function selectRegTowns(req, res) {
    try {
      const townselect = req.body.towns
      const filtered = await data.filterRegs(registrationFunction.fromWhere(townselect))
      if(!filtered.length){
        res.render('index', { err: 'There is no registration for the selected town' });
      }else {
        res.render('index', {filtered});
      }
    } catch (err) {
      console.log('Error', err)
  }
  }
  async function reset(req, res) {
    try {
      await data.reset();
      res.render('index', { clear: 'Registrations have been successfully cleared' });
    } catch (err) {
      console.log('Error reseting app', err)
  }
  }
  return {
    postRegistration,
    getRegistration,
    reset,
    selectRegTowns,
  };
}








