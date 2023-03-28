\echo "Delete and recreate studyus db?"
\prompt "Return for yes or control-C to cancel > " answer

-- DROPPING AND RECREATING THE STUDYUS DATABASE
DROP DATABASE studyus;
CREATE DATABASE studyus;

--CONNECTING TO THE STUDYUS DATABASE AND STUDYUS SCHEMA TABLES
\connect studyus
\i studyus-schema.sql