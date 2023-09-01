import assert from "assert";
import pgPromise from "pg-promise";
import query from "../service/query.js";

const pgp = pgPromise();

// should we use an SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://otzyymfe:0lGTbqnyGfXApYOVD2IceTfouyXP0oxi@silly.db.elephantsql.com/otzyymfe?ssl=true";

const database = pgp(connectionString);
const data = query(database);

describe('Greeting with routes database', function(){
    this.timeout(10000);
    beforeEach(async function(){
        // Clean the tables before each test run
        await data.reset();
    });

    it("should be able to insert and retrieve registrations", async function () {
        await data.insertReg("CA 1235", 1); 
        const registrations = await data.getReg();
        assert.deepEqual(registrations[0], {
            regnumber: 'CA 1235'
        });
    });

    it('should insert and retrieve', async function() {
        await data.insertReg("CA 1234");
        const registrations = await data.getReg();
        assert.deepEqual(registrations, [
            {
                regnumber: 'CA 1234',
            }
        ]);
    });

    it("should be able to retrieve a town's registrations", async function () {
        await data.insertReg("CA 123", 1); 
        const townCode = "CA";
        const registrations = await data.filterRegs(townCode);

        assert.deepEqual(registrations, [
            {
                regnumber: 'CA 123'
            }
        ]);
    });

    it("should be able to reset the registrations", async function () {
        await data.insertReg("CA 123", 1); 
        await data.reset();
        const registrations = await data.getReg();
        assert.deepEqual(registrations, []);
    });

    after(function () {
        pgp.end();
    });
});





