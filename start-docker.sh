#!/bin/bash

echo "🚀 Bắt đầu khởi động Backend với Docker..."

# Build và chạy containers
echo "📦 Building và starting containers..."
docker-compose up -d --build

# Đợi MySQL sẵn sàng
echo "⏳ Đợi MySQL khởi động..."
sleep 20

# Chạy migrations
echo "🔄 Chạy database migrations..."
docker-compose exec -T backend sh -c "cd /app && npx sequelize-cli db:migrate"

# Chạy seeders
echo "🌱 Chạy database seeders..."
docker-compose exec -T backend sh -c "cd /app && npx sequelize-cli db:seed:all"

echo "✅ Hoàn tất! Backend đang chạy tại http://localhost:8081"
echo "📊 Xem logs: docker-compose logs -f"

