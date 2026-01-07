# Sử dụng Node.js LTS version
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port
EXPOSE 8081

# Chạy ứng dụng với nodemon và babel-node
CMD ["npm", "start"]

