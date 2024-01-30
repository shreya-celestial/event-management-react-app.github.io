/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      org_id INTEGER REFERENCES organizations(id) NOT NULL,
      token VARCHAR(50) NOT NULL
    );
    INSERT INTO users (name, first_name, last_name, org_id, token, email)
    VALUES ('Shreya Garg', 'Shreya', 'Garg', 1, 'FDIPPMQAAF6HDHUQH73M', 'gargshreya122@gmail.com');
  `)
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE users
  `)
};
