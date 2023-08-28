export default function registrationNumbers() {
  var registrationNum = "";
  var location = '';
  var storeRegistrationNumbers = [];

  function setRegistration(registration) {
    registrationNum = registration;
    return registrationNum;
  }

  function setTown(town) {
    location = town;
  }

  function addRegistration(registration) {
    var enteredRegistration = setRegistration(registration);
    if (!storeRegistrationNumbers.includes(enteredRegistration)) {
      storeRegistrationNumbers.push(enteredRegistration);
    }
  }

  function getRegistrations() {
    return storeRegistrationNumbers;
  }

  function getTown() {
    return location;
  }

  function allFromTown() {
    var fromTown = [];
    for (var i = 0; i < storeRegistrationNumbers.length; i++) {
      var regNumber = storeRegistrationNumbers[i].trim();
      if (regNumber.startsWith(location)) {
        fromTown.push(regNumber);
      }
    }
    return fromTown;
  }

  return {
    setRegistration,
    setTown,
    getRegistrations,
    addRegistration,
    allFromTown,
    getTown,
  }
}
