# Hướng dẫn Deploy Backend với Docker

## Yêu cầu
- Docker đã được cài đặt
- Docker Compose đã được cài đặt

## Cấu trúc Docker

### 1. Dockerfile
File `Dockerfile` được sử dụng để build image cho backend Node.js.

### 2. docker-compose.yml
File này định nghĩa 2 services:
- **mysql**: MySQL 8.0 database
- **backend**: Node.js API server

## Cách sử dụng

### Bước 1: Tạo file .env (tùy chọn)
Copy file `.env.example` thành `.env` và chỉnh sửa nếu cần:
```bash
cp .env.example .env
```

### Bước 2: Build và chạy containers
```bash
# Build và chạy tất cả services
docker-compose up -d

# Hoặc build lại nếu có thay đổi
docker-compose up -d --build
```

### Bước 3: Xem logs
```bash
# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của backend
docker-compose logs -f backend

# Xem logs của MySQL
docker-compose logs -f mysql
```

### Bước 4: Chạy migrations (nếu cần)
```bash
# Vào container backend
docker-compose exec backend sh

# Chạy migrations (từ thư mục /app)
cd /app
npx sequelize-cli db:migrate

# Chạy seeders (nếu có)
npx sequelize-cli db:seed:all

# Hoặc chạy trực tiếp từ bên ngoài
docker-compose exec -T backend sh -c "cd /app && npx sequelize-cli db:migrate"
docker-compose exec -T backend sh -c "cd /app && npx sequelize-cli db:seed:all"
```

## Các lệnh Docker thường dùng

### Dừng containers
```bash
docker-compose stop
```

### Dừng và xóa containers
```bash
docker-compose down
```

### Xóa containers và volumes (xóa cả database)
```bash
docker-compose down -v
```

### Rebuild lại image
```bash
docker-compose build --no-cache
```

### Vào container backend
```bash
docker-compose exec backend sh
```

### Vào container MySQL
```bash
docker-compose exec mysql mysql -u root -p
# Password: rootpassword
```

## Cấu hình

### Thay đổi port
Sửa file `docker-compose.yml`:
```yaml
ports:
  - "8081:6969"  # Thay đổi port bên ngoài (8081) nếu cần
```

### Thay đổi database password
Sửa trong `docker-compose.yml`:
```yaml
environment:
  MYSQL_ROOT_PASSWORD: your_new_password
  MYSQL_PASSWORD: your_new_password
```

Và cập nhật trong `.env` hoặc environment variables của backend service.

### Thay đổi database name
Sửa trong `docker-compose.yml`:
```yaml
MYSQL_DATABASE: your_database_name
```

## Kiểm tra

### Backend API
- URL: http://localhost:8081
- Kiểm tra health endpoint (nếu có)

### MySQL Database
- Host: localhost
- Port: 3306
- Username: root
- Password: rootpassword (hoặc password bạn đã set)
- Database: Bookingcare1

## Troubleshooting

### Backend không kết nối được database
1. Kiểm tra MySQL đã chạy: `docker-compose ps`
2. Kiểm tra logs: `docker-compose logs mysql`
3. Đảm bảo backend đợi MySQL sẵn sàng (đã có healthcheck)

### Port đã được sử dụng
Thay đổi port trong `docker-compose.yml`:
```yaml
ports:
  - "3307:3306"  # Thay đổi port MySQL
  - "8082:8081"  # Thay đổi port backend
```

### Xóa và tạo lại containers
```bash
docker-compose down -v
docker-compose up -d --build
```

## Production Deployment

### 1. Cập nhật environment variables
Sửa file `docker-compose.yml` với các giá trị production:
- Đổi password database mạnh hơn
- Set `NODE_ENV=production`
- Cấu hình CORS đúng domain

### 2. Build production image
```bash
docker-compose -f docker-compose.yml build
```

### 3. Deploy lên server
- Upload code lên server
- Chạy `docker-compose up -d`
- Cấu hình reverse proxy (Nginx) nếu cần

## Lưu ý

1. **Database persistence**: Data được lưu trong volume `mysql_data`, sẽ không mất khi restart container
2. **Hot reload**: Code được mount vào container, thay đổi sẽ tự động reload (nếu dùng nodemon)
3. **Security**: Đổi password mặc định trước khi deploy production
4. **Backup**: Backup volume `mysql_data` định kỳ

