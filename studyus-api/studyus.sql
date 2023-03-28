\echo "Delete and recreate studyus db?"
\prompt "Return for yes or control-C to cancel > " answer

-- DROPPING AND RECREATING THE BUGTRACKER DATABASE
DROP DATABASE studyus;
CREATE DATABASE studyus;

--CONNECTING TO THE BUGTRACKER DATABASE AND BUGTRACKER SCHEMA TABLES
\connect studyus
\i studyus-schema.sql