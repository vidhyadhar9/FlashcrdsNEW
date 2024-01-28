const exp=require('express');
const app=exp();
const mysql=require('mysql');
const bodyParser=require('body-parser');
const cors=require('cors');
const multer=require('multer');
const path=require('path');


//stock overflow middleware
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

//middlewares
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended:true}))
app.use(exp.static('public'))




//sending images to backend and storing in public folder
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/images')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+ "_"+Date.now() + path.extname(file.originalname));
//     }
// })

// //multer
// const upload=multer({
//     storage:storage
// })


//posting an image
// app.post('/upload',upload.single('image'),(req,res)=>{
//    const image=req.file.filename;
//    const sql="UPDATE flashcardstable SET image=?";
//    connection.query(sql,[image],(err,result)=>{
//     if(err)return res.json({Message:"Error"});
//     return res.json({Status:"Success"});
//    })
// })





app.listen(3500,()=>console.log("server is running on port 3500"));
//connecting to data base
const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'vidhii@9',
    database:'flashcardschema'
});


//checking if connection is succesful or not
connection.connect((error)=>{
    if(error){
        console.log('error in db',error);
    }
    else{
        console.log('db connection succesful');
    }
})





//Routes
//post request
app.post('/flashcard/post',(req,res)=>{
    const question=req.body.question;
    const answer=req.body.answer;
    const sqlInsert="INSERT INTO flashcardstable(questions,answer) VALUES(?,?);";
    connection.query(sqlInsert,[question,answer],(err,result)=>{
        err&&console.log("error is",err);
        result&&console.log("result is:",result);
        res.json("succesfully submitted"); 
    })
})


//Get  Request

app.get('/flashcard/get',(req,res)=>{
   const sqlGet='SELECT * FROM flashcardstable';
   connection.query(sqlGet,(err,result)=>{
    err&&consloe.log("err is ",err);
    result&&res.send(result)
   })
})

app.post('/flashcard/del',(req,res)=>{
    console.log("cont is"+req.body.questions)
    const sqlDel='DELETE from flashcardstable where questions=?;';
  
    connection.query(sqlDel,[req.body.questions],(err,result)=>{
        err&&console.log("error is",err);
        result&&console.log("result is:",result)
        res.json("succesfully deleted"); ;
        
    })
})