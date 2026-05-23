# RoomRadar QC

RoomRadar QC is a Queens College classroom availability finder. Students can search by day, time range, and campus building to find rooms that are not scheduled for class, while admins can upload semester schedule CSV files to refresh the room database.

> Availability is based on course schedule data, not live occupancy. A listed room may still be locked, reserved, or in use.

## Features

- Search available classrooms by day, start time, end time, and building
- View the scheduled classes for a selected room
- Filter results across major Queens College buildings
- Admin login with Firebase Authentication
- Protected admin CSV upload for semester schedule data
- Flask API backed by a MySQL database
- Automated API and database test files included

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React, Vite, Material UI, React Router |
| Backend | Python, Flask, Flask-CORS |
| Database | MySQL |
| Auth | Firebase Web SDK, Firebase Admin SDK |
| Testing | Python request-based API tests, SQL database checks |

## Repository Structure

```text
CSCI-370-Final-Project/
|-- backend/                 Flask API, database models, routes
|   |-- routes/              Room search and admin upload endpoints
|   |-- sample_data/         Sample schedule CSV
|   |-- app.py               Flask application entry point
|   |-- config.py            Environment-based database config
|   |-- models.py            MySQL table setup and connection helper
|   `-- requirements.txt     Python dependencies
|-- frontend/                React + Vite application
|   |-- src/components/      Navbar and protected admin route
|   |-- src/pages/           Home, search, room details, admin screens
|   |-- src/firebase.js      Firebase client configuration
|   `-- package.json         Frontend scripts and dependencies
|-- tests/                   API tests and SQL database checks
|-- Documentation/           Project reports, manuals, deployment docs
|-- Rooms.csv                Queens College schedule data
`-- CONTEXT.md               Additional project notes
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3
- MySQL database
- Firebase Admin service account JSON for the backend

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

The submitted project zip includes the backend environment configuration and Firebase Admin SDK service account file needed by `backend/app.py`.

Run the backend:

```bash
python app.py
```

The API runs at `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
```

The submitted project zip includes the frontend environment configuration for the API base URL.

Run the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## API Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/rooms/search` | Find rooms available for a day and time range |
| `GET` | `/api/rooms/<room_id>/schedule` | Get the schedule for one room on a selected day |
| `POST` | `/api/admin/semester` | Upload a semester CSV file, protected by Firebase token auth |

### Room Search Query Parameters

| Parameter | Example | Notes |
| --- | --- | --- |
| `day` | `Monday` | Full weekday name |
| `starttime` | `10:00` | 24-hour `HH:MM` format |
| `endtime` | `12:00` | 24-hour `HH:MM` format |
| `building` | `PH` | Optional building code |

Example:

```text
GET /api/rooms/search?day=Monday&starttime=10:00&endtime=12:00&building=PH
```

## CSV Upload Format

The admin upload imports in-person classes from a semester CSV. The backend currently uses these columns:

| Column | Purpose |
| --- | --- |
| `Description` | Course name |
| `Day` | Meeting day, such as `M`, `T`, `TH`, or combined values |
| `Time` | Time range, such as `9:10 AM - 12:00 PM` |
| `Instructor` | Instructor name |
| `Location` | Room code, such as `PH 110` |
| `Limit` | Room capacity |
| `Mode of Instruction` | Only `In-Person` rows are imported |

Rows with online locations, missing rooms, missing times, or non-in-person instruction are skipped.

## Running Tests

Start the Flask backend first:

```bash
cd backend
python app.py
```

Then run the API tests from the repository root:

```bash
python tests/test_rooms.py
python tests/test_schedule.py
python tests/test_admin.py
```

Database checks are available in:

```text
tests/test_database.sql
```

Recent documented test results are in [tests/TEST_RESULTS.md](tests/TEST_RESULTS.md).

## Documentation

Additional project materials are stored in `Documentation/`, including:

- Deployment guide
- Database schema
- Manual
- Requirements traceability matrix
- Test description and test results
- Scrum log
- Contribution disclosure

## Known Limitations

- Room availability is schedule-based and does not confirm real-time occupancy.
- Admin upload depends on the expected Queens College CSV column names.
- Building filters use building codes internally.
- Firebase service account credentials are included only in the submitted project zip, not in the public repository.

## Team

| Member | Role |
| --- | --- |
| Darshan | Backend Developer / Database Engineer |
| Kyrilous | Frontend Developer |
| Joseph | Tester / QA |
