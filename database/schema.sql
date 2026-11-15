
-- Creates the students table and loads the initial data
-- Run with: psql -U postgres -d school -f database/schema.sql


DROP TABLE IF EXISTS students;

-- students table
CREATE TABLE students (
    student_id      SERIAL PRIMARY KEY,      -- auto-incrementing integer id
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,    -- no two students can share an email
    enrollment_date DATE
);

-- Initial Data
INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');
