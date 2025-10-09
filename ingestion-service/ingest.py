import requests
import json
import os
import sys

# Attempt to retrieve the API key
api_key = os.environ.get('WEATHER_API_KEY')

# If the API key is missing, print an error and exit
if not api_key:
    print("Error: WEATHER_API_KEY environment variable is not set.", file=sys.stderr)
    sys.exit(1)

# Attempt to retrieve the city, providing a default if it's not set
city = os.environ.get('CITY', 'Toronto') or 'Toronto'

request_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

# The Node.js API endpoint
target_api_url = "http://api-service:3000/weather"

def fetch_weather_data():
    try:
        response = requests.get(request_url)
        response.raise_for_status()  # Raise an exception for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None

def post_data_to_api(data):
    try:
        response = requests.post(target_api_url, json=data)
        response.raise_for_status()
        print(f"Data successfully posted to API: {response.text}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error posting data to API: {e}")
        return False

if __name__ == "__main__":
    weather_data = fetch_weather_data()
    if weather_data:
        if not post_data_to_api(weather_data):
            sys.exit(1)
    else:
        sys.exit(1)

