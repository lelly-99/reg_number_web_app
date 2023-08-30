-- CREATE TABLE towns (
--   id SERIAL PRIMARY KEY,
--   town_code VARCHAR(2) NOT NULL UNIQUE,
--   town_name VARCHAR(20) NOT NULL
-- );

-- CREATE TABLE registration_numbers (
--   id SERIAL PRIMARY KEY,
--   registration_plate VARCHAR(20) NOT NULL,
--   town_id INT REFERENCES towns(id)
-- );


-- INSERT INTO towns (town_code, town_name) VALUES
--   ('CA', 'Cape Town'),
--   ('CY', 'Bellville'),
--   ('CJ', 'Paarl'),
--   ('CL', 'Stellenbosch');


-- SELECT town_code, id AS town_id
-- FROM towns
-- WHERE town_code IN ('CA', 'CY', 'CJ', 'CL');

-- Create the towns table
-- Create towns table
CREATE TABLE towns (
  id SERIAL PRIMARY KEY,
  town_code VARCHAR(2) UNIQUE NOT NULL,
  town_name VARCHAR(20) NOT NULL
);

-- Create registration_numbers table
CREATE TABLE registration_numbers (
  id SERIAL PRIMARY KEY,
  registration_plate VARCHAR(20) NOT NULL,
  town_code VARCHAR(2) NOT NULL,
  town_id INT,
  FOREIGN KEY (town_code) REFERENCES towns(town_code)
);

-- Create a trigger function to automatically assign town_id
CREATE OR REPLACE FUNCTION assign_town_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.town_code := SUBSTRING(NEW.registration_plate FROM 1 FOR 2);
  SELECT id INTO NEW.town_id FROM towns WHERE town_code = NEW.town_code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires before inserting into registration_numbers
CREATE TRIGGER before_insert_registration
BEFORE INSERT ON registration_numbers
FOR EACH ROW
EXECUTE FUNCTION assign_town_id();

-- Insert data into the towns table
INSERT INTO towns (town_code, town_name) VALUES
  ('CA', 'Cape Town'),
  ('CY', 'Bellville'),
  ('CJ', 'Paarl'),
  ('CL', 'Stellenbosch');




