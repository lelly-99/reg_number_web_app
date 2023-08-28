export default function main(registrationFunction) {
  async function getRegistration(req, res) {
    try {
      const registrations = registrationFunction.getRegistrations();
      res.render("index", { registrations });
    } catch (err) {
      console.log('error', err);
    }
  }

  async function postRegistration(req, res) {
    try {
      const registration = req.body.registration;
    //   const town = req.body.town;
      registrationFunction.setRegistration(registration);
    //   registrationFunction.setTown(town);
      registrationFunction.addRegistration(registration);
      res.redirect("/");
    } catch (err) {
      console.log("Error", err);
    }
  }

  return {
    postRegistration,
    getRegistration,
  };
}
