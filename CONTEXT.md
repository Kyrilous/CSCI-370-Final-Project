# RoomRadar QC — Project Context

## What The App Does
RoomRadar QC is a web app for Queens College students to find available classrooms in real time. Students search by day, time range, and building. Admins upload a CSV file of the semester schedule to populate the database.

---

## Team
| Member | Role |
|--------|------|
| Darshan | Backend Developer / Database Engineer |
| Kyro | Frontend Developer |
| Joseph | Tester / QA |

---

## Tech Stack
- **Frontend:** React + Vite + Material UI
- **Backend:** Python + Flask
- **Database:** MySQL hosted on AWS EC2
- **Auth:** Firebase (frontend login) + Firebase Admin SDK (backend token verification)

---

## Project Structure
```
CSCI-370-Final-Project/
├── frontend/                  React frontend
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── FindRooms.jsx       search rooms by day/time/building
│       │   ├── RoomDetails.jsx     view room schedule
│       │   ├── AdminLogin.jsx      Firebase login
│       │   └── AdminDashboard.jsx  CSV upload
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── ProtectedAdminRoute.jsx
│       └── firebase.js
├── backend/
│   ├── app.py                 Flask entry point, Firebase Admin init
│   ├── config.py              EC2 MySQL connection settings
│   ├── models.py              Creates DB tables on startup
│   ├── requirements.txt       Python dependencies
│   └── routes/
│       ├── admin.py           POST /api/admin/semester (CSV upload)
│       └── rooms.py           GET /api/rooms/search, GET /api/rooms/<id>/schedule
├── Rooms.csv                  Queens College schedule data
└── CONTEXT.md                 This file
```

---

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/semester` | Admin uploads CSV → populates DB |
| GET | `/api/rooms/search` | Find available rooms by day/time/building |
| GET | `/api/rooms/<id>/schedule` | Get full schedule for a room |

### Search Parameters
- `day` — Monday, Tuesday, Wednesday, Thursday, Friday
- `starttime` — HH:MM format
- `endtime` — HH:MM format
- `building` — building code (PH, KY, SB, RE) or "All"

---

## Database Schema
```sql
CREATE TABLE semesters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_code VARCHAR(20),
    building VARCHAR(100),
    capacity INT
);

CREATE TABLE schedules (
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
```

---

## AWS EC2 Setup
- **EC2 IP:** 18.223.123.14
- **MySQL Port:** 3306 (open to 0.0.0.0/0 in security group)
- **Database:** school_project
- **MySQL User:** darshan
- bind-address set to 0.0.0.0 in /etc/mysql/mysql.conf.d/mysqld.cnf

---

## CSV Format (Rooms.csv)
Columns used from the Queens College schedule CSV:
- `Description` — course name
- `Day` — class day (M, T, W, TH, F or combinations like "T, TH")
- `Time` — time range (e.g. "9:10 AM - 12:00 PM")
- `Instructor` — instructor name
- `Location` — room code (e.g. "PH 110")
- `Limit` — room capacity
- `Mode of Instruction` — only "In-Person" rows are imported

Rows skipped:
- Online classes (Location starts with "OL")
- Missing/empty time values
- Non in-person classes

---

## Authentication Flow
1. Admin logs in via Firebase on the frontend (AdminLogin.jsx)
2. Firebase returns an ID token stored in localStorage as "adminToken"
3. AdminDashboard.jsx sends the token as `Authorization: Bearer <token>`
4. Flask backend verifies the token using Firebase Admin SDK
5. Returns 401 if token is missing or invalid

### Firebase Service Account Key
- File: `roomradar-qc-firebase-adminsdk-fbsvc-2ae032eef0.json`
- Location: `backend/` folder
- NOT committed to GitHub (in .gitignore)
- Must be shared manually between team members

---

## Running The Project

### Backend
```
cd backend
pip install -r requirements.txt
python app.py
```
Runs on http://localhost:5000

### Frontend
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

---

## Dependencies
### Backend (requirements.txt)
- flask
- flask-cors
- mysql-connector-python
- firebase-admin

### Frontend (package.json)
- react
- react-router-dom
- @mui/material
- firebase

---

## Known Limitations
- API URLs are hardcoded to localhost:5000 — must be changed if backend is deployed remotely
- Python 3.8 is past end of life — Firebase/Google libraries show deprecation warnings
- No pagination on search results
- Building filter uses building code (PH, KY, etc.) not full building name
- serviceAccountKey.json must be manually shared with each developer
- Day matching relies on CSV day format (M, T, TH etc.) matching exactly

---

## Key Bugs Fixed
1. **Duplicate rooms** — CSV upload was inserting a new room row for every class row. Fixed by checking if room already exists before inserting.
2. **Timedelta serialization** — MySQL TIME columns returned as Python timedelta objects which can't be JSON serialized. Fixed by converting to string.
3. **Wrong API URLs** — Frontend was sending requests to relative URLs (hitting Vite dev server instead of Flask). Fixed by using full http://localhost:5000 URLs.
4. **SpooledTemporaryFile** — Python 3.8 bug with io.TextIOWrapper. Fixed by reading file bytes directly and wrapping with io.StringIO.
5. **Bind address** — MySQL was only listening on localhost. Fixed by setting bind-address to 0.0.0.0 in mysqld.cnf.
