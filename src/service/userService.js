import { truncates } from "bcryptjs";
import db from "../models/index";
import bcrypt from 'bcryptjs';
const saltRounds = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist

                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true,
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName']
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);//false

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";

                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = "User is not found"
                }


            }
            else {
                //return error
                userData.errCode = 1
                userData.errMessage = " Your username is not exist in your system. Plz try again!!"
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}
//da duoc thu vien bcryspt lam
// let compareUserPassword = (password) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//         } catch (error) {
//             reject(error)
//         }
//     })
// }
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashUserPassword = await bcrypt.hashSync(password, saltRounds);

            resolve(hashUserPassword);

        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId == 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId != 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = async (data) => {
    //check email exist

    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email already exist, pls try another email"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: "ok"
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "the user is not found"
                })
            }
            await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                errCode: 0,
                message: "Delete user successfully"
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    // console.log("check data update:", data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameter"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,

            })
            if (user) {
                // cap nhat thong tin voi bien data
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();
                //luu thong tin
                resolve({
                    errCode: 0,
                    message: "Update user successfully"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "User not found"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            } else {
                let res = {};
                let allcode = await db.AllCodes.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            };
        } catch (e) {
            reject(e);
        }
    })
}

let sendBookingEmailService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Booking email data received:', data);

            if (!data.doctorId || !data.patientName || !data.patientEmail || !data.patientPhone) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                });
                return;
            }

            // Lấy thông tin bác sĩ
            console.log('Looking for doctor with ID:', data.doctorId);
            let doctor = await db.User.findOne({
                where: { id: data.doctorId },
                attributes: ['email', 'firstName', 'lastName'],
                raw: true
            });

            console.log('Doctor found:', doctor);

            if (!doctor) {
                resolve({
                    errCode: 2,
                    errMessage: "Doctor not found"
                });
                return;
            }

            // Kiểm tra email của bác sĩ
            if (!doctor.email || doctor.email.trim() === '') {
                resolve({
                    errCode: 4,
                    errMessage: "Doctor email not found. Please update doctor's email in the system."
                });
                return;
            }

            // Lấy thông tin thời gian
            let timeType = await db.AllCodes.findOne({
                where: { keyMap: data.timeType },
                attributes: ['valueVi', 'valueEn']
            });

            let timeDisplay = timeType ? timeType.valueVi : data.timeType;
            let dateDisplay = new Date(+data.date).toLocaleDateString('vi-VN');

            // Import nodemailer
            const nodemailer = require('nodemailer');

            // Kiểm tra cấu hình email
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
                resolve({
                    errCode: 3,
                    errMessage: "Email configuration not found. Please configure EMAIL_USER and EMAIL_PASSWORD in .env file"
                });
                return;
            }

            // Cấu hình transporter (sử dụng Gmail SMTP)
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            // Kiểm tra lại email trước khi gửi
            const doctorEmail = doctor.email ? doctor.email.trim() : '';
            if (!doctorEmail) {
                console.log('Doctor email is missing:', doctor);
                resolve({
                    errCode: 4,
                    errMessage: "Doctor email is invalid or not found"
                });
                return;
            }

            // Đảm bảo firstName và lastName không null
            const doctorFirstName = doctor.firstName || '';
            const doctorLastName = doctor.lastName || '';
            const doctorFullName = `${doctorFirstName} ${doctorLastName}`.trim() || 'Bác sĩ';

            console.log('Sending email to doctor:', doctorEmail);

            // Nội dung email
            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: doctorEmail,
                subject: 'Thông báo đặt lịch khám mới',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #337a73;">Thông báo đặt lịch khám mới</h2>
                        <p>Xin chào bác sĩ <strong>${doctorFullName}</strong>,</p>
                        <p>Bạn có một lịch đặt khám mới với thông tin sau:</p>
                        <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <ul style="list-style: none; padding: 0;">
                                <li style="margin: 10px 0;"><strong>Họ và tên bệnh nhân:</strong> ${data.patientName}</li>
                                <li style="margin: 10px 0;"><strong>Email:</strong> ${data.patientEmail}</li>
                                <li style="margin: 10px 0;"><strong>Số điện thoại:</strong> ${data.patientPhone}</li>
                                <li style="margin: 10px 0;"><strong>Ngày khám:</strong> ${dateDisplay}</li>
                                <li style="margin: 10px 0;"><strong>Thời gian:</strong> ${timeDisplay}</li>
                            </ul>
                        </div>
                        <p>Vui lòng xác nhận và chuẩn bị cho lịch khám này.</p>
                        <p style="margin-top: 30px;">Trân trọng,<br><strong>Hệ thống BookingCare</strong></p>
                    </div>
                `
            };

            // Gửi email
            await transporter.sendMail(mailOptions);

            resolve({
                errCode: 0,
                errMessage: "Email sent successfully"
            });

        } catch (e) {
            console.log('Error sending email:', e);
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    sendBookingEmailService: sendBookingEmailService,


}