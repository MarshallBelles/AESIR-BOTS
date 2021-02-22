--- Our 3 members
CREATE TYPE member_type AS ENUM ('Pup','Pack','Dire');
CREATE TYPE claim_type AS ENUM ('Ore','Story','Anomaly','Pack','PI');
CREATE TYPE claim_status AS ENUM ('Pending','Approved','Rejected');

CREATE TABLE IF NOT EXISTS config (
    hangars text[],
    admin_channel text,
    fighter_channel text,
    hr_channel text,
    main_channel text,
    orders_channel text,
    skills_channel text,
    tech_level_channel text,
    the_woods_channel text
);

INSERT INTO config (
    hangars,
    admin_channel,
    fighter_channel,
    hr_channel,
    main_channel,
    orders_channel,
    skills_channel,
    tech_level_channel,
    the_woods_channel
) VALUES (
    ARRAY['misaba','clarelam','hub'],
    '791341047820845066',
    '800103862685270047',
    '796760114945458196',
    '790939110029262888',
    '800097380162732053',
    '796435112039809044',
    '796131272941502525',
    '776559380970995712'
);

CREATE TABLE IF NOT EXISTS members (
    member_id numeric PRIMARY KEY NOT NULL,
    name varchar NOT NULL,
    type member_type NOT NULL,
    officer boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS claims (
    id INT PRIMARY KEY NOT NULL,
    member_id numeric references members(member_id),
    type claim_type NOT NULL,
    amount numeric NOT NULL,
    timestamp numeric NOT NULL,
    status claim_status NOT NULL,
    name varchar,
    helpers text[]
);

CREATE SEQUENCE claim_id
START 1
INCREMENT 1
MINVALUE 1
OWNED BY claims.id;