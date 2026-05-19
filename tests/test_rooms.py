import requests

BASE_URL = "http://localhost:5000"

def test_search_returns_200():
    response = requests.get(f"{BASE_URL}/api/rooms/search?day=Monday&starttime=10:00&endtime=12:00&building=PH")
    assert response.status_code == 200, "Search should return 200"
    print("PASS - Search returns 200")

def test_search_returns_list():
    response = requests.get(f"{BASE_URL}/api/rooms/search?day=Monday&starttime=10:00&endtime=12:00&building=PH")
    data = response.json()
    assert isinstance(data, list), "Search should return a list"
    print(f"PASS - Search returns a list with {len(data)} rooms")

def test_search_all_buildings():
    response = requests.get(f"{BASE_URL}/api/rooms/search?day=Monday&starttime=10:00&endtime=12:00")
    assert response.status_code == 200, "Search with no building filter should return 200"
    print("PASS - Search with no building filter works")

def test_search_no_duplicate_rooms():
    response = requests.get(f"{BASE_URL}/api/rooms/search?day=Monday&starttime=10:00&endtime=12:00")
    data = response.json()
    room_codes = [r["room_code"] for r in data]
    assert len(room_codes) == len(set(room_codes)), "No duplicate rooms in search results"
    print("PASS - No duplicate rooms in search results")

def test_search_rooms_have_correct_fields():
    response = requests.get(f"{BASE_URL}/api/rooms/search?day=Monday&starttime=10:00&endtime=12:00&building=PH")
    data = response.json()
    if len(data) > 0:
        room = data[0]
        assert "id" in room, "Room should have id"
        assert "room_code" in room, "Room should have room_code"
        assert "building" in room, "Room should have building"
        print("PASS - Rooms have correct fields")
    else:
        print("SKIP - No rooms returned to check fields")

if __name__ == "__main__":
    print("\n--- Running Room Search Tests ---")
    test_search_returns_200()
    test_search_returns_list()
    test_search_all_buildings()
    test_search_no_duplicate_rooms()
    test_search_rooms_have_correct_fields()
    print("\nAll room search tests passed!")
