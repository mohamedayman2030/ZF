import express, { Application } from 'express';
import {Request,Response} from 'express';
import multer from 'multer';
import app from '../server';
import { damage,damages } from '../models/damages';
// import fetch from "node-fetch";

const fetch = require("cross-fetch");

// const request = require("request");

const thedamage = new damages();
let arr:string[] = [];

var storage = multer.diskStorage({
     destination:function(req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
       
    }
})

var upload = multer({ storage: storage })

const userRoute = (app:express.Application)=>{
    app.post('/upload_data',upload.array("files"), userData);

    // app.post('http://localhost:5000/upload_data', upload.array("files"), );
}


interface MulterRequest extends Request {
    files: any;
}


const userData = async (req:Request, res:Response)=>{

    arr = []
    console.log(req.body.li);
    //console.log((req as MulterRequest).files);
    let values = (req as MulterRequest).files
    for(let i=0;i<values.length;i++){
        arr.push(values[i]['filename']);
    }
    console.log(arr);

    let license_num = req.body.li
    
    // req.body["files"] = arr


    const response_ = await fetch("http://localhost:5000/upload_data", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"li": license_num,"files":arr}
        ),
      });
    let result = await response_.json();
      console.log(result);
      res.json({ message: "Successfully uploaded files" });
    
      if(result.message.license_check === false){
        res.status(400).json({message:"the lisence number doesn't match the image"});
      }
      else {
        try {
     const newdamage:damage = {
        lisence_number:req.body.li,
        damage:result.message.damage
     }
      const addeddamage= await thedamage.create(newdamage)
      res.json('added damage successfully');
      }
      catch(err){
res.json('error in adding the damage');
      }
    }

}
const dataToModel = (req:Request,res:Response)=>{
    
}

export default userRoute;