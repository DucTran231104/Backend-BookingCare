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
                    attributes: ['email', 'roleId', 'password']
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
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
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
            if (!data.id) {
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
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}