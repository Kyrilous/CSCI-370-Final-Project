from flask import Blueprint, request, jsonify
from models import get_db
rooms_bp = Blueprint("rooms", __name__)

@rooms_bp.route("/api/rooms/search", methods=["GET"])
def search_rooms():
    day=request.args.get("day")
    start_time=request.args.get("starttime")
    end_time=request.args.get("endtime")
    building=request.args.get("building")

    db=get_db()
    cursor=db.cursor(dictionary=True)

    query="""
        SELECT DISTINCT rooms.id,rooms.room_code,rooms.building
        FROM rooms
        WHERE rooms.id NOT IN(
            SELECT room_id FROM schedules
            WHERE day=%s
            AND start_time<%s
            AND end_time>%s
        )
    """
    params=[day,end_time,start_time]

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

    cursor.execute("""
        SELECT course_name, instructor, day, start_time, end_time
        FROM schedules
        WHERE room_id = %s AND day = %s
        ORDER BY start_time
    """, (room_id, day))

    schedule = cursor.fetchall()

    return jsonify(schedule)


    
 