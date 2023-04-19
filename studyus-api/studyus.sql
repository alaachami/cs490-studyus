\echo "Delete and recreate studyus db?"
\prompt "Return for yes or control-C to cancel > " answer

-- DROPPING AND RECREATING THE STUDYUS DATABASE
DROP DATABASE d1gj6ej3leju7j;
CREATE DATABASE d1gj6ej3leju7j;

--CONNECTING TO THE STUDYUS DATABASE AND STUDYUS SCHEMA TABLES
\connect d1gj6ej3leju7j
\i studyus-schema.sql