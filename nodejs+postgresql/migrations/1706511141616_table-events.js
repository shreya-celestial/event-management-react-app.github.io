/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      name_text VARCHAR(50) NOT NULL,
      name_html VARCHAR(57) NOT NULL,
      dsc_text VARCHAR(200) NOT NULL,
      dsc_html VARCHAR(207) NOT NULL,
      capacity INTEGER NOT NULL,
      org_id INTEGER REFERENCES organizations(id) NOT NULL,
      start_utc TIMESTAMP NOT NULL,
      end_utc TIMESTAMP NOT NULL
    );
  `)
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE events;
  `)
};
