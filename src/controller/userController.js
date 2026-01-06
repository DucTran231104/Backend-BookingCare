const { Model } = require("sequelize")
import userService from '../service/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter ??!!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    //check email exist
    //compare password
    //return userInfor
    //access_token:JWT : json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id;// All, single

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameter ??!",
            users: []
        })
    }
    let user = await userService.getAllUser(id);



    return res.status(200).json({
        errCode: 0,
        message: "OK",
        users: user,
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameter ??!",
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get allcode error: ', e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server",
        })
    }
}

let sendBookingEmail = async (req, res) => {
    try {
        let data = await userService.sendBookingEmailService(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Send booking email error: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
    sendBookingEmail: sendBookingEmail
}