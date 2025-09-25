// const bcrypt = require('bcrypt');
import { combineTableNames } from 'sequelize/lib/utils';
import db from '../models/index';
import bcrypt from 'bcryptjs';
const saltRounds = bcrypt.genSaltSync(10);
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('create a new user succeed!');

            // return new Promise(async (resolve, reject) => {
            //     try {
            //         await db.User.create({
            //             email: data.email,
            //             password: data.password,
            //             firstName: data.firstName,
            //             lastName: data.lastName,
            //             address: data.address,
            //             gender: data.gender,
            //             roleId: data.roleId,
            //             phoneNumber: data.phoneNumber,
            //             positionId: data.positionId,
            //             image: data.image,
            //         })
            //         resolve(true);
            //     } catch (e) {
            //         reject(e);
            //     }
            // })
        } catch (e) {
            reject(e);
        }
    })
}
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
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //timf user voi id
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                // cap nhat thong tin voi bien data
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                //luu thong tin
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();

            }
            resolve();
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}