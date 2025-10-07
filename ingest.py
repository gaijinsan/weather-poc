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

try:
    # Make the GET request to the API
    response = requests.get(request_url)

    # Raise an HTTPError for bad responses (4xx or 5xx)
    response.raise_for_status()

    # Parse the JSON response
    weather_data = response.json()

    with open("weather_data.json", "w") as f:
        json.dump(weather_data, f, indent=4)

except requests.exceptions.RequestException as e:
    # Handle any request-related errors (e.g., network issues)
    print(f"Error making API call: {e}")

