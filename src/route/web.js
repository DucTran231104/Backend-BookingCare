import express from "express"
import homeController from "../controller/homeController"
import userController from "../controller/userController"
let router = express.Router();
//1 server == app
let initWebRoutes = (app) => {
    // router.get('/', (req, res) => {
    //     return res.send("Hello TranDuc")
    // })
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use("/", router)
}

module.exports = initWebRoutes;