import { UPDATE } from "sequelize/lib/query-types";
import db from "../models/index"
import CRUDservice from "../service/CRUDservice"
let getHomePage = async (req, res) => {
    try {
        // Sử dụng models từ index.js
        let data = await db.User.findAll();
        return res.render("homePage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);


    }
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);

    return res.send("post crud successfully");
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    // console.log("----------------------------")
    // console.log(data)
    // console.log("----------------------------")
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        //check userData is not found
        // let userData
        return res.render("editCRUD.ejs", {
            user: userData
        })
    }
    else {
        return res.send("user not found")
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send("delete user successfully");
    }
    else {
        return res.send("user not found")
    }
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
} 