#!/bin/bash

# LangSearch CLI Wrapper
# Usage: ./langsearch.sh "your query"

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

QUERY=$1

if [ -z "$LANGSEARCH_API_KEY" ]; then
    echo "Error: LANGSEARCH_API_KEY not found in .env"
    exit 1
fi

if [ -z "$QUERY" ]; then
    echo "Usage: $0 \"query\""
    exit 1
fi

# Call LangSearch API
response=$(curl -s -X POST "https://api.langsearch.com/v1/web-search" \
     -H "Authorization: Bearer $LANGSEARCH_API_KEY" \
     -H "Content-Type: application/json" \
     -d "{\"query\": \"$QUERY\", \"count\": 5}")

# Check if curl was successful
if [ $? -ne 0 ]; then
    echo "Error: API call failed."
    exit 1
fi

# Print the response (JSON)
echo "$response"
