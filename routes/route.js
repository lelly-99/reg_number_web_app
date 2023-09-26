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
      const townId = await data.getTownId(registrationFunction.getCode(registrations));
      const error = registrationFunction.errorMessage(registrations);
      const regChecking = await data.checkReg(registrations)
      if(regChecking.length > 0 ){
        req.flash("error", "Registration already exists");
      }
      if (error) {
        req.flash("error", error);
      } else {
        await data.insertReg(registrations, townId.id);
      }
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  }

  async function selectRegTowns(req, res) {
    try {
      const townselect = req.body.towns;
      const filtered = await data.filterRegs(registrationFunction.fromWhere(townselect));
      if (!townselect) {
      req.flash("err", "Please select a town");
      }else if (filtered.length <= 0 ) {
        req.flash("err", "There is no registration for the selected town");
      }
      res.render("index", { filtered, err: req.flash("err")  });
    } catch (err) {
      console.log("Error resetting app", err);
    }
  }

  async function reset(req, res) {
    try {
      await data.reset();
      req.flash("clear", "Registrations have been successfully cleared");
      res.redirect("/");
    } catch (err) {
      console.log("Error resetting app", err);
    }
  }

  return {
    postRegistration,
    getRegistration,
    reset,
    selectRegTowns,
  };
}








