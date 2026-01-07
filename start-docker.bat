@echo off
echo 🚀 Bắt đầu khởi động Backend với Docker...

REM Build và chạy containers
echo 📦 Building và starting containers...
docker-compose up -d --build

REM Đợi MySQL sẵn sàng
echo ⏳ Đợi MySQL khởi động...
timeout /t 20 /nobreak >nul

REM Chạy migrations
echo 🔄 Chạy database migrations...
docker-compose exec -T backend sh -c "cd /app && npx sequelize-cli db:migrate"

REM Chạy seeders
echo 🌱 Chạy database seeders...
docker-compose exec -T backend sh -c "cd /app && npx sequelize-cli db:seed:all"

echo ✅ Hoàn tất! Backend đang chạy tại http://localhost:8081
echo 📊 Xem logs: docker-compose logs -f
pause

