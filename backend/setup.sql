-- Run this on the EC2 MySQL server to set up the database
-- sudo mysql -u root < setup.sql

CREATE DATABASE IF NOT EXISTS school_project;
USE school_project;

CREATE USER IF NOT EXISTS 'darshan'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON school_project.* TO 'darshan'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS semesters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_code VARCHAR(20),
    building VARCHAR(100),
    capacity INT
);

CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    semester_id INT,
    course_name VARCHAR(100),
    instructor VARCHAR(100),
    day VARCHAR(20),
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (semester_id) REFERENCES semesters(id)
);
