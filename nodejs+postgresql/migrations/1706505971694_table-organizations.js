/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE organizations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO organizations (name,created)
    VALUES ('Shreya Garg', '2023-10-18T01:00:52');
  `)
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE organizations;
  `)
};
