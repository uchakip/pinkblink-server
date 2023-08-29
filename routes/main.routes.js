import { Router } from "express";
import { productModel } from "../models/womanwear.js";
import { productModel3 } from "../models/skincare.js";
import { productModel2 } from "../models/makeup.js";
import { hash, compare } from 'bcrypt';
import { userModel } from "../models/users.js";
import jwt from 'jsonwebtoken';
import multer from "multer";
const mainRouter = Router();
const upload = multer()

mainRouter.use(upload.array())

mainRouter.get('/womanwear', async(req,res)=>{

    try {
        const data = await productModel.find();
        const count = await productModel.count();
        
        if(count > 0){
            res.json(data);
           
        }
        else {
            res.json({message: "No clothes found"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }
   
});
mainRouter.get('/makeup', async(req,res)=>{

    try {
        const data = await productModel2.find();
        const count = await productModel2.count();
        
        if(count > 0){
            res.json(data);
           
        }
        else {
            res.json({message: "No makeup products found"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }
   
});
mainRouter.get('/skincare', async(req,res)=>{

    try {
        const data = await productModel3.find();
        const count = await productModel3.count();
        
        if(count > 0){
            res.json(data);
           
        }
        else {
            res.json({message: "No skincare products found"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }
   
});

mainRouter.get('/womanwear/:id', async(req,res)=>{

    try {

        let womanwearId= req.params.id;
        // 64e22a06f97d37f307defd5f
        const data = await productModel.findById({ _id: womanwearId });
        
        if(data){
            res.json(data);
        }
        else {
            res.json({message: "No product with specified id was found"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }
   
});
mainRouter.get('/makeup/:id', async(req,res)=>{

    try {

        let makeupId= req.params.id;
        // 64e22a06f97d37f307defd5f
        const data = await productModel2.findById({ _id: makeupId });
        
        if(data){
            res.json(data);
        }
        else {
            res.json({message: "No makeup product with specified id was found"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }
   
});
mainRouter.get('/skincare/:id', async(req,res)=>{

    try {

        let skincareId= req.params.id;
        // 64e22a06f97d37f307defd5f
        const data = await productModel3.findById({ _id: skincareId });
        
        if(data){
            res.json(data);
        }
        else {
            res.json({message: "No skincare product with specified id was found"});
        }
        res.end();
    }
    catch(err) {
        console.log(err);
    }
   
});


mainRouter.post('/register', async(req,res)=>{
    const {username, email, password, gender, phonenumber} = req.body; 
    console.log(req.body);
    const encryptedPassword = await hash(password, 10);

    try {
        const user = await userModel.create({
            username,
            email,
            password: encryptedPassword,
            gender,
            phonenumber
        });

        res.status(201).json({ user});
        res.end();

    }
    catch(err) {
        console.log(err);
        res.json({message: err});
        res.end();
    }
});


mainRouter.post('/login', async(req,res)=>{
    
    const {username, password} = req.body;

    
    try{
        const user = await userModel.findOne({username});

        if(!user) {
            res.status(401).json({message: "User not found"});
            res.end();
        }

        const isPasswordValid = await compare(password, user.password);

        if(!isPasswordValid){
            res.status(401).json({message:"Unauthorized, invalid credentials"});
            res.end();
        }


        const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({token: token });
        res.end();

    }
    catch(err) {
        console.log(err);
    }

});

export default mainRouter;