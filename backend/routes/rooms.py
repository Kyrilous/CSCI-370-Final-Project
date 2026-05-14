from flask import Blueprint, request, jsonify
from models import get_db
rooms_bp = Blueprint("rooms", __name__)

DAY_MAP = {
    "Monday": "M",
    "Tuesday": "T",
    "Wednesday": "W",
    "Thursday": "TH",
    "Friday": "F",
}


def normalize_day(day):
    return DAY_MAP.get(day, day)


def day_match_clause():
    return "(day = %s OR FIND_IN_SET(%s, REPLACE(day, ' ', '')) > 0)"


@rooms_bp.route("/api/rooms/search", methods=["GET"])
def search_rooms():
    day = request.args.get("day")
    start_time = request.args.get("starttime")
    end_time = request.args.get("endtime")
    building = request.args.get("building")

    db = get_db()
    cursor = db.cursor(dictionary=True)

    normalized_day = normalize_day(day)

    query = f"""
        SELECT DISTINCT rooms.id, rooms.room_code, rooms.building
        FROM rooms
        WHERE rooms.id NOT IN(
            SELECT room_id FROM schedules
            WHERE {day_match_clause()}
            AND start_time < %s
            AND end_time > %s
        )
    """
    params = [day, normalized_day, end_time, start_time]

    if building and building != "All":
        query += " AND rooms.building = %s"
        params.append(building)

    cursor.execute(query, params)
    rooms = cursor.fetchall()

    return jsonify(rooms)


@rooms_bp.route("/api/rooms/<int:room_id>/schedule", methods=["GET"])
def room_schedule(room_id):
    day = request.args.get("day")
    db = get_db()
    cursor = db.cursor(dictionary=True)

    normalized_day = normalize_day(day)
    query = f"""
        SELECT course_name, instructor, day, start_time, end_time
        FROM schedules
        WHERE room_id = %s AND {day_match_clause()}
        ORDER BY start_time
    """
    cursor.execute(query, (room_id, day, normalized_day))

    schedule = cursor.fetchall()

    for row in schedule:
        row["start_time"] = str(row["start_time"])
        row["end_time"] = str(row["end_time"])

    return jsonify(schedule)


    
 