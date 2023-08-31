
CREATE TABLE towns (
    ID SERIAL PRIMARY KEY,
    town_code varchar(2) NOT NULL,
    town_name varchar(15) NOT NULL
);

CREATE TABLE registrations (
    regID SERIAL PRIMARY KEY,
    regNumber varchar(20) NOT NULL,
    townID int REFERENCES towns(ID)
);

INSERT INTO towns (town_code, town_name) VALUES
  ('CA', 'Cape Town'),
  ('CY', 'Bellville'),
  ('CJ', 'Paarl'),
  ('CL', 'Stellenbosch');




