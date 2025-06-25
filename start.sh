#!/bin/bash

echo "🚀 Starting Todo App..."
echo "================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

echo "📦 Building and starting all services..."
docker-compose up --build -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "✅ Todo App is starting up!"
echo "================================"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 API: http://localhost:5000"
echo "📚 API Docs: http://localhost:5000/swagger"
echo "🗄️  MongoDB: localhost:27017"
echo ""
echo "📋 To view logs: docker-compose logs -f"
echo "🛑 To stop: docker-compose down"
echo "================================"

# Show logs
echo "📋 Showing logs (Ctrl+C to exit):"
docker-compose logs -f
