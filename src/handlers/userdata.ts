import express from 'express';
import {Request,Response} from 'express';
import multer from 'multer';

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
    app.post('/upload_data',upload.array("files"),userData);
}

interface MulterRequest extends Request {
    files: any;
}


const userData = async (req:Request,res:Response)=>{
  

    console.log(req.body.li);
    //console.log((req as MulterRequest).files);
    let values = (req as MulterRequest).files
    for(let i=0;i<values.length;i++){
        arr.push(values[i]['filename']);
    }
    console.log(arr);
    res.json({ message: "Successfully uploaded files" });
  
   
   
}


const dataToModel = (req:Request,res:Response)=>{
    
}

export default userRoute;