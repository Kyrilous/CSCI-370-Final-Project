-- Run these in PuTTY after connecting to MySQL
-- sudo mysql -u root
-- USE school_project;

-- Test 1: Check data was loaded
SELECT 'rooms count' AS test, COUNT(*) AS result FROM rooms;
SELECT 'schedules count' AS test, COUNT(*) AS result FROM schedules;
SELECT 'semesters count' AS test, COUNT(*) AS result FROM semesters;

-- Test 2: Check for duplicate rooms (should return 0 rows)
SELECT room_code, building, COUNT(*) AS count
FROM rooms
GROUP BY room_code, building
HAVING COUNT(*) > 1;

-- Test 3: Check schedules are linked to valid rooms (should return 0)
SELECT COUNT(*) AS orphaned_schedules
FROM schedules
WHERE room_id NOT IN (SELECT id FROM rooms);

-- Test 4: Check times are stored correctly
SELECT room_id, start_time, end_time
FROM schedules
LIMIT 5;

-- Test 5: Check a specific room search works
SELECT DISTINCT rooms.id, rooms.room_code, rooms.building
FROM rooms
WHERE rooms.id NOT IN (
    SELECT room_id FROM schedules
    WHERE day = 'M'
    AND start_time < '12:00:00'
    AND end_time > '10:00:00'
)
AND rooms.building = 'PH'
LIMIT 5;
