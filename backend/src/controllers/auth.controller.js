import userModels from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const register=async(req,res)=>{
    const {username,password}=req.body;

    const isUesrAlreadyExist=await userModels.findOne({username});

    if(isUesrAlreadyExist){
        return res.status(400).json({
            message:"user already exist"
        })
    }

    const user=await userModels.create({
        username,password
    })
    // create a token
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
    res.cookie("token",token)

    res.status(201).json({
        message:"user created successfully",
        user,
        token
    })



}

export const login=async(req,res)=>{
    const {username,password}=req.body;

    const user=await userModels.findOne({username,password});

    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const isPasswordMatch=password===user.password;
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    // create a token
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
    res.cookie("token",token)

    res.status(200).json({
        message:"login successful",
        username:user.username,
        id:user._id,
    })




}