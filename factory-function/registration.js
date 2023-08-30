// export default function registrationNumbers() {
//   var registrationNum = "";
//   var location = '';
//   var storeRegistrationNumbers = [];

//   function setRegistration(registration) {
//     registrationNum = registration;
//     return registrationNum;
//   }
  
//   function setTown(town) {
//     location = town;
//   }

//   function addRegistration(registration) {
//     var enteredRegistration = setRegistration(registration).toUpperCase();
//     if (!storeRegistrationNumbers.includes(enteredRegistration)) {
//       storeRegistrationNumbers.push(enteredRegistration);
//     }
//   }
  
//   function errorMessage (registration) {
//     var enteredRegistration = setRegistration(registration).toUpperCase();
//     if (!enteredRegistration) {
//       return 'Please enter a registration number';
//     } else if (!/^[A-Z]{2}\s\d{3}[-\s]\d{3}$/.test(enteredRegistration)) {
//       return 'Please enter a valid registration number';
//     }
//   }

//   function getRegistrations() {
//     return storeRegistrationNumbers;
//   }

//   function getTown() {
//     return location;
//   }

//   function allFromTown() {
//     var fromTown = [];
//     for (var i = 0; i < storeRegistrationNumbers.length; i++) {
//       var regNumber = storeRegistrationNumbers[i].trim();
//       if (regNumber.startsWith(location)) {
//         fromTown.push(regNumber);
//       }
//     }
//     return fromTown;
//   }

//   return {
//     setRegistration,
//     setTown,
//     getRegistrations,
//     addRegistration,
//     allFromTown,
//     getTown,
//     errorMessage,
//   }
// }
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
      var enteredRegistration = setRegistration(registration).toUpperCase();
      if (!storeRegistrationNumbers.includes(enteredRegistration)) {
          storeRegistrationNumbers.push(enteredRegistration);
      }
  }

  // function errorMessage(registration) {
  //     var enteredRegistration = setRegistration(registration).toUpperCase();
  //     if (!enteredRegistration) {
  //         return 'Please enter a registration number';
  //     } else if (!/^[A-Z]{2}\s\d{3}[-\s]\d{3}$/.test(enteredRegistration)) {
  //         return 'Please enter a valid registration number';
  //     }
  // }
  function errorMessage(registration) {
    var enteredRegistration = setRegistration(registration).toUpperCase();
    if (!enteredRegistration) {
        return 'Please enter a registration number';
    } else if (!/^[A-Z]{2}\s\d{3}[-\s]\d{3}$/.test(enteredRegistration)) {
        return 'Please enter a valid registration number';
    } else if (!/^(CL|CY|CJ|CA)/.test(enteredRegistration)) {
        return 'Please enter a registration numbers for Cape Town, Bellville, Paarl or Stellenbosch';
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
      errorMessage,
  }
}

