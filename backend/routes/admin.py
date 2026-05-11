from flask import Blueprint, request, jsonify
from models import get_db
import csv
import io
from datetime import datetime



admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/api/admin/semester", methods=["POST"])
def upload_semester():
    name = request.form.get("semesterName")
    file=request.files.get("csvFile")

    db=get_db()
    cursor=db.cursor()
    cursor.execute("INSERT INTO semesters (name) VALUES (%s)", (name,))
    db.commit()
    semester_id=cursor.lastrowid

    content = file.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(content))

    for row in reader:
        if row['Mode of Instruction'] != "In-Person":
            continue

        location = row["Location"].strip()
        if not location or location.startswith("OL"):
            continue

        parts = location.split(" ")
        building_code = parts[0]
        room_code = location

        cursor.execute(
            "INSERT INTO rooms (room_code, building, capacity) VALUES (%s, %s, %s)",
            (room_code, building_code, row["Limit"])
        )
        room_id = cursor.lastrowid

        raw_time = row["Time"].strip()
        if not raw_time or " - " not in raw_time:
            continue
        start_str, end_str = raw_time.split(" - ")
        start_time = datetime.strptime(start_str.strip(), "%I:%M %p").strftime("%H:%M:%S")
        end_time = datetime.strptime(end_str.strip(), "%I:%M %p").strftime("%H:%M:%S")

        cursor.execute(
            "INSERT INTO schedules (room_id, semester_id, course_name, instructor, day, start_time, end_time) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (room_id, semester_id, row["Description"], row["Instructor"], row["Day"], start_time, end_time)
        )

    db.commit()

    return jsonify({"message": "Semester uploaded successfully!"})
                            

