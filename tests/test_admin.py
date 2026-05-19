import requests

BASE_URL = "http://localhost:5000"

def test_upload_no_token_returns_401():
    response = requests.post(f"{BASE_URL}/api/admin/semester")
    assert response.status_code == 401, "Upload with no token should return 401"
    data = response.json()
    assert data["message"] == "Unauthorized", "Should return Unauthorized message"
    print("PASS - Upload with no token returns 401")

def test_upload_invalid_token_returns_401():
    headers = {"Authorization": "Bearer invalidtoken123"}
    response = requests.post(f"{BASE_URL}/api/admin/semester", headers=headers)
    assert response.status_code == 401, "Upload with invalid token should return 401"
    data = response.json()
    assert data["message"] == "Invalid token", "Should return Invalid token message"
    print("PASS - Upload with invalid token returns 401")

if __name__ == "__main__":
    print("\n--- Running Admin Auth Tests ---")
    test_upload_no_token_returns_401()
    test_upload_invalid_token_returns_401()
    print("\nAll admin auth tests passed!")
