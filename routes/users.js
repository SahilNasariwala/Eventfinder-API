const express=require("express");
const router=express.Router();
const UserController=require("../controllers/users");
const checkauth=require("../Authentication/CheckAuth");

router.get('/users',checkauth,UserController.getUsers);
router.post('/users/signup',UserController.signup);
router.post('/users/login',UserController.login);
router.delete('/users/delete',checkauth,UserController.deleteUser);
module.exports=router;
