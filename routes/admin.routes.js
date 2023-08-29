import { Router } from "express";
import jwt from 'jsonwebtoken';
import { userModel } from "../models/users.js";
import { productModel } from "../models/womanwear.js";
import multer, { diskStorage } from "multer";
import { productModel2 } from "../models/makeup.js";
import { productModel3 } from "../models/skincare.js";



const adminRouter = Router();


const authMiddleware= async (req,res, next) =>{
    console.log("auth middleware ");
    const token = req.headers.token;

    if(!token) {
        res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findById({_id:decoded.userId });

        if(!user) {
            res.status(401).json({message: "Unauthorized"});
            res.send();
        }

        next();
    }
    catch(err) {
        res.status(401).json({message: err});
        res.send();
    }
};

adminRouter.use(authMiddleware);

const storage = diskStorage({
    destination: (req, file, cb)=>{
        cb(null, process.env.UPLOAD_PATH)
    },
    filename: (req, file, cb) =>{ 
        
        const filename = file.originalname.toLowerCase().split(' ').join('.')
        cb(null, filename);
    }
});

let upload=  multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error("only .jpg,.jpeg and .png extensions allowed"));
        }
    }
})

adminRouter.post('/createproduct/:collection' ,upload.single('cover') , async (req,res)=>{
    try {
        console.log(req.body);
        const collection = req.params.collection;
        const {title, description , userId, price, originalprice, discount , stock } = req.body;

        let uploadurl =  req.protocol + "://" +req.get("host") +"/" + process.env.UPLOAD_PATH +"/" + req.file.filename;

      

        let newProduct;
        if (collection === "womanwear") {
            newProduct = await productModel.create({
                cover: uploadurl,
                cover2: uploadurl,
                title, 
                description,
                price,
                originalprice,
                discount,
                stock,
                user: userId,
            });
        } else if (collection === "makeup") {
            newProduct = await productModel2.create({
                cover: uploadurl,
                title, 
                description,
                price,
                originalprice,
                discount,
                stock,
                user: userId,
            });
        } else if (collection === "skincare") {
            newProduct = await productModel3.create({
                cover: uploadurl,
                title, 
                description,
                price,
                originalprice,
                discount,
                stock,
                user: userId,
            });
        }

        res.status(201).json({ newProduct });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default adminRouter;