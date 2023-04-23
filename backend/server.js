const exp=require('express');
const app=exp();
const mysql=require('mysql');
const bodyParser=require('body-parser');
const cors=require('cors');


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


//middlewares

app.use(exp.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))


//Routes
//post request
app.post('/flashcard/post',(req,res)=>{
    const question=req.body.question;
    const answer=req.body.answer;
    const sqlInsert="INSERT INTO flashcardstable(questions,answer) VALUES(?,?);";
    connection.query(sqlInsert,[question,answer],(err,result)=>{
        err&&console.log("error is",err);
        result&&console.log("result is:",result);
        res.send("succesfully submitted"); 

    })
})

app.get('/flashcard/get',(req,res)=>{
   const sqlGet='SELECT * FROM flashcardstable';
   connection.query(sqlGet,(err,result)=>{
    err&&consloge.log("err is ",err);
    result&&res.send(result)
   })
})

app.delete('/flashcard/get',(req,res)=>{
    
})