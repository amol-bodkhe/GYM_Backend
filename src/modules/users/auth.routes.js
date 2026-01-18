const express=require('express');
const AuthRoute=express.Router();
const authMiddleware=require('../../middlewares/auth.middleware')

const {addUser,loginUser,getProfile}=require('./auth.controller');

AuthRoute.post('/register',addUser);
AuthRoute.post('/login',loginUser);
AuthRoute.post('/profile',authMiddleware,getProfile);

module.exports=AuthRoute;