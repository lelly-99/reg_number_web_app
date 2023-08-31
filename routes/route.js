export default function main(registrationFunction, data) {
  async function getRegistration(req, res) {
    try {
      const registrations = await data.getReg();
      console.log(registrations)
      res.render("index", { registrations });
    } catch (err) {
      console.log("error", err);
    }
  }

  async function postRegistration(req, res) {
    try {
      const registration = req.body.registration.toUpperCase();
      const error = registrationFunction.errorMessage(registration)
      if(error){
        req.flash('error', error)
      }else {
        await data.insertReg(registration)
      }
      res.redirect("/");
    } catch (err) {
      console.log("Error", err);
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




