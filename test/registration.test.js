import assert from "assert";
import registrationNumbers from "../factory-function/registration.js";

describe("all from town", function () {
    it('should be able to return registration numbers from cape town "CA"', function () {
      var fromCapeTown = registrationNumbers();
      
      fromCapeTown.addRegistration('CA 124');
      fromCapeTown.addRegistration('CA 567');
      fromCapeTown.addRegistration('CA 345');
      fromCapeTown.addRegistration('CL 456');
      fromCapeTown.addRegistration('CL 341');
      fromCapeTown.setTown('CA');
  

      assert.deepEqual(fromCapeTown.allFromTown(), ["CA 124", "CA 567", "CA 345"]);
    });

    it('should be able to return registration numbers from Bellville "CY"', function () {
        var fromBellville = registrationNumbers();
        
        fromBellville.addRegistration('CY 124');
        fromBellville.addRegistration('CY 567');
        fromBellville.addRegistration('CY 345');
        fromBellville.addRegistration('CL 456');
        fromBellville.addRegistration('CA 341');
        fromBellville.setTown('CY');
    
  
        assert.deepEqual(fromBellville.allFromTown(), ["CY 124", "CY 567", "CY 345"]);
      });

      it('should be able to return registration numbers from Paarl "CJ"', function () {
        var fromPaarl = registrationNumbers();
        
        fromPaarl.addRegistration('CJ 124');
        fromPaarl.addRegistration('CJ 567');
        fromPaarl.addRegistration('CJ 345');
        fromPaarl.addRegistration('CL 456');
        fromPaarl.addRegistration('CL 341');
        fromPaarl.setTown('CJ');
    
  
        assert.deepEqual(fromPaarl.allFromTown(), ["CJ 124", "CJ 567", "CJ 345"]);
      });
  });