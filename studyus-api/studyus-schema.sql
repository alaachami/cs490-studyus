-- TABLE FOR STORING USER INFORMATION
CREATE TABLE users 
(
        id              SERIAL PRIMARY KEY,
        email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
        name            TEXT NOT NULL,
        password        TEXT NOT NULL,
        bio             TEXT,
        created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);


--TABLE FOR STORING GROUP INFORMATION
CREATE TABLE groups
(
        id              SERIAL PRIMARY KEY,
        name            TEXT NOT NULL,
        description     TEXT NOT NULL,
        members         INTEGER[],
        isbn            INTEGER,
        school          TEXT,
        course_name     TEXT,
        status          TEXT,
        created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
        owner_id        INTEGER NOT NULL
);