
-- CREATE TABLE users (
--   id INT NOT NULL AUTO_INCREMENT,
--   username VARCHAR(50) NOT NULL,
--   email VARCHAR(255) NOT NULL CHECK (POSITION('@' IN email) > 1),
--   password VARCHAR(255) NOT NULL,
--   bio TEXT,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   PRIMARY KEY (id)
-- );

-- -- Group table
-- CREATE TABLE groups (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(255) NOT NULL,
--   subject VARCHAR(255) NOT NULL,
--   isbn INTEGER,
--   school TEXT,
--   description VARCHAR(255) DEFAULT '',
--   admin_id INT NOT NULL,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   capacity INT NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (admin_id) REFERENCES users(id)
-- );

-- -- Group Members table
-- CREATE TABLE group_members (
--   group_id INT NOT NULL,
--   member_id INT NOT NULL,
--   is_admin BOOLEAN NOT NULL,
--   PRIMARY KEY (group_id, member_id),
--   FOREIGN KEY (group_id) REFERENCES groups(id),
--   FOREIGN KEY (member_id) REFERENCES users(id)
-- );

-- -- Chat Message table
-- CREATE TABLE chat_messages (
--   id INT NOT NULL AUTO_INCREMENT,
--   group_id INT NOT NULL,
--   sender_id INT NOT NULL,
--   message TEXT NOT NULL,
--   timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (id),
--   FOREIGN KEY (group_id) REFERENCES groups(id),
--   FOREIGN KEY (sender_id) REFERENCES users(id)
-- );

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Group table
CREATE TABLE groups (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  isbn INTEGER,
  school TEXT,
  description VARCHAR(255) DEFAULT '',
  admin_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  capacity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (admin_id) REFERENCES users(id)
);

-- Group Members table
CREATE TABLE group_members (
  group_id INT NOT NULL,
  member_id INT NOT NULL,
  is_admin BOOLEAN NOT NULL,
  PRIMARY KEY (group_id, member_id),
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (member_id) REFERENCES users(id)
);

-- Chat Message table
CREATE TABLE chat_messages (
  id INT NOT NULL AUTO_INCREMENT,
  group_id INT NOT NULL,
  sender_id INT NOT NULL,
  message TEXT NOT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);

-- File table
CREATE TABLE files (
  id INT NOT NULL AUTO_INCREMENT,
  group_id INT NOT NULL,
  uploader_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filepath VARCHAR(255) NOT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (uploader_id) REFERENCES users(id)
);
