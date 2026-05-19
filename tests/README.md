# Tests

## How to Run

Make sure Flask is running first:
```
cd backend
python app.py
```

Then in a new terminal install requests if needed:
```
pip install requests
```

Run each test file:
```
python tests/test_rooms.py
python tests/test_schedule.py
python tests/test_admin.py
```

## Database Tests
Run `test_database.sql` in PuTTY:
```
sudo mysql -u root
USE school_project;
```
Then paste the SQL queries from `test_database.sql`.

## Test Files
- `test_rooms.py` - Tests room search endpoint
- `test_schedule.py` - Tests room schedule endpoint
- `test_admin.py` - Tests admin auth (401 for missing/invalid token)
- `test_database.sql` - SQL queries to verify database integrity
