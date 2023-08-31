export default function registrationNumbers() {
  var registrationNum = "";

  function setRegistration(registration) {
    registrationNum = registration;
    return registrationNum;
  }
  
  function errorMessage(registration) {
    var enteredRegistration = setRegistration(registration);
    if (!enteredRegistration) {
        return 'Please enter a registration number';
    } else if (!/^[A-Z]{2}\s\d{3}[-\s]\d{3}$/.test(enteredRegistration)) {
        return 'Please enter a valid registration number';
    } else if (!/^(CL|CY|CJ|CA)/.test(enteredRegistration)) {
        return 'Please enter a registration numbers for Cape Town, Bellville, Paarl or Stellenbosch';
    }
}

  return {
    setRegistration,
    errorMessage,
  }
}
