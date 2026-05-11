import mysql.connector
from config import DB_CONFIG

def get_db():
    return mysql.connector.connect(**DB_CONFIG)

def create_tables():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS semesters (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            room_code VARCHAR(20),
            building VARCHAR(100),
            capacity INT
        )
    """)

    cursor.execute("""
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
        )
    """)

    db.commit()
    cursor.close()
    db.close()
