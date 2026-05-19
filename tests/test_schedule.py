import requests

BASE_URL = "http://localhost:5000"

def test_schedule_returns_200():
    response = requests.get(f"{BASE_URL}/api/rooms/1/schedule?day=Monday")
    assert response.status_code == 200, "Schedule should return 200"
    print("PASS - Schedule returns 200")

def test_schedule_returns_list():
    response = requests.get(f"{BASE_URL}/api/rooms/1/schedule?day=Monday")
    data = response.json()
    assert isinstance(data, list), "Schedule should return a list"
    print(f"PASS - Schedule returns a list with {len(data)} entries")

def test_schedule_has_correct_fields():
    response = requests.get(f"{BASE_URL}/api/rooms/1/schedule?day=Monday")
    data = response.json()
    if len(data) > 0:
        entry = data[0]
        assert "course_name" in entry, "Entry should have course_name"
        assert "instructor" in entry, "Entry should have instructor"
        assert "start_time" in entry, "Entry should have start_time"
        assert "end_time" in entry, "Entry should have end_time"
        print("PASS - Schedule entries have correct fields")
    else:
        print("SKIP - No schedule entries to check fields")

def test_schedule_times_are_strings():
    response = requests.get(f"{BASE_URL}/api/rooms/1/schedule?day=Monday")
    data = response.json()
    if len(data) > 0:
        entry = data[0]
        assert isinstance(entry["start_time"], str), "start_time should be a string"
        assert isinstance(entry["end_time"], str), "end_time should be a string"
        print("PASS - Times are returned as strings")
    else:
        print("SKIP - No schedule entries to check time format")

def test_invalid_room_returns_empty():
    response = requests.get(f"{BASE_URL}/api/rooms/999999/schedule?day=Monday")
    assert response.status_code == 200, "Invalid room should return 200 not crash"
    data = response.json()
    assert data == [], "Invalid room should return empty list"
    print("PASS - Invalid room ID returns empty list")

if __name__ == "__main__":
    print("\n--- Running Schedule Tests ---")
    test_schedule_returns_200()
    test_schedule_returns_list()
    test_schedule_has_correct_fields()
    test_schedule_times_are_strings()
    test_invalid_room_returns_empty()
    print("\nAll schedule tests passed!")
