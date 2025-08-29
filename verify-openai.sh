#!/bin/bash
set -e

if [ -z "$OPENAI_API_KEY" ]; then
  echo "❌ OPENAI_API_KEY is not set"
  exit 1
fi

echo "🔑 Testing with key: $(echo $OPENAI_API_KEY | cut -c1-15)..."

resp=$(curl -s https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
        "model": "gpt-4o-mini",
        "messages": [{"role":"user","content":"ping"}],
        "max_tokens": 5
      }')

echo "✅ Response:"
echo "$resp" | jq '.choices[0].message.content'
