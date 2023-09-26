export default function registrationNumbers() {
  var registrationNum = "";
  var code = ''
  var storeRegistrationNumbers = [];

  function setRegistration(registration) {
    registrationNum = registration;
    return registrationNum;
  }

  function addRegistration(registration) {
    var enteredRegistration = setRegistration(registration);
    if (!storeRegistrationNumbers.includes(enteredRegistration)) {
      return storeRegistrationNumbers.push(enteredRegistration); 
    }
  }

  function errorMessage(registration) {
    var enteredRegistration = setRegistration(registration);
    if (!enteredRegistration) {
        return 'Please enter a registration number';
    } else if (!/^[A-Z]{2} \d{3}[-\d]*$/.test(enteredRegistration) && !/^[A-Z]{2} \d{3}(\s\d{3})?$/.test(enteredRegistration)) {
        return 'Please enter a valid registration number';
    } else if (!/^(CL|CY|CJ|CA)/.test(enteredRegistration)) {
        return 'Please enter a registration numbers for Cape Town, Bellville, Paarl or Stellenbosch';
    } 
}
function existReg(){
  if(!addRegistration(registrationNum)){
    return 'Registration number alredy exists'
}
}

function fromWhere(townName){
  if (townName === "Cape Town"){
    code = "CA";
  }else if (townName === "Bellville"){
    code = "CY";
  }else if (townName === "Paarl"){
    code = "CJ";
  }else if (townName === "Stellenbosch"){
    code = "CL";
  }
  return code
}

function getCode(registration) {
  return registration.substring(0, 2); 
}

  return {
    setRegistration,
    errorMessage,
    getCode,
    fromWhere,
    addRegistration,
    existReg,
  }
}