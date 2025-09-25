import express from "express";

let configViewEngine = (app) => {
    //arrow function
    //VD:muốn lấy ảnh trên sever -> ảnh trên sever lấy trong thư mục public
    //nodejs render ra file view (sever và client dùng nodejs ->cấu hình stactic)
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs"); // tương tự file jsp(java),blade(php)  
    app.set("views", "./src/views")
}

module.exports = configViewEngine;