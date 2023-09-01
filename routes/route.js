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
      const registrations = req.body.registration;
      const townId = await data.getTownId(registrationFunction.getCode(registrations))
      const error = registrationFunction.errorMessage(registrations)
      if(error){
        req.flash('error', error)
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
        req.flash('err', 'There is no registration for the selected town')
        res.redirect('/');
      }
      res.render('index', {filtered});
    } catch (err) {
      console.log('Error reseting app', err)
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
    reset,
    selectRegTowns,
  };
}




