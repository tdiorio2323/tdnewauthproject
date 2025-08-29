#!/bin/bash

# Kill any running Vite/Node dev servers
pkill -f "vite|node .*vite" 2>/dev/null || true
echo "Killed existing Vite processes."

# Clean Vite cache
rm -rf node_modules/.vite
echo "Cleaned Vite cache."

# Check for node_modules and install if missing
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running npm install..."
  npm install
else
  echo "node_modules found. Skipping npm install."
fi

# Start the dev server
echo "Starting dev server on port 5192..."
npm run dev -- --port 5192
