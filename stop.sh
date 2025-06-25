#!/bin/bash

echo "🛑 Stopping Todo App..."
echo "================================"

docker-compose down

echo ""
echo "✅ Todo App stopped successfully!"
echo "🗑️  To remove all data: docker-compose down -v"
