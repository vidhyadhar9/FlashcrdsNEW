const exp=require('express');
const app=exp();
// const mysql=require('mysql');
const bodyParser=require('body-parser');
const cors=require('cors');
// const multer=require('multer');
const path=require('path');
const bcryptjs=require('bcryptjs');
const sendEmail=require('./sendEmail');
const jwt = require('jsonwebtoken');


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












app.listen(3500,()=>console.log("server is running on port 3500"));


//creating and connecting to db
//importing mongo 
const mclinet=require('mongodb').MongoClient;
mclinet.connect('mongodb://127.0.0.1/27017')
.then(dbref=>{
    const FlashDB=dbref.db('Flashcards');
    const FlashCollection=FlashDB.collection('FlascardsCollection');
    const Login=FlashDB.collection('Login');
    app.set('FlashCollection',FlashCollection);
    app.set('Login',Login);

console.log("db successfully connected");
}).catch(err=>{console.log("err at db:"+err.message)});





//Routes
//post request
app.post('/flashcards/signup',async(req,res)=>{
    const Loginobj=app.get('Login');
    console.log(req.body);
    let findobj=await Loginobj.findOne({mail:req.body.mail})
    console.log(findobj)
    if(findobj===null)
    {
        let hashedPassword = await bcryptjs.hash(req.body.password,5)
        req.body.password=hashedPassword
        await Loginobj.insertOne(req.body);
        const token = jwt.sign({mail:req.body.mail} ,'secretekey',{ expiresIn: '1h' });
        console.log(token);
         let subject = 'ur signup is successful'
                let message='congratulations'                                 //sending emails
                let send_to =req.body.mail
                let sent_from = process.env.EMAIL_USER
                let reply_to = req.body.mail
                sendEmail(subject,message,send_to,sent_from,reply_to);
        res.status(200).send({message:"successufully account created",token:token});
       
    }
    else{
       
        res.send({message:"User already existed"});
    }
})


//login
app.post('/flashcards/login',async(req,res)=>{
    const Loginobj=app.get('Login');
    console.log(req.body);
    let findobj=await Loginobj.findOne({mail:req.body.mail})
    console.log(findobj)
    if(findobj===null)
    {
        res.send({message:"enter correct credentials"});
       
    }
    else{
       
        let verify = await bcryptjs.compare(req.body.password,findobj.password);
        
        if(verify===true)
        {
            const token = jwt.sign({mail:req.body.mail} ,'secretekey',{ expiresIn: '1h' });
            console.log(token);
            res.send({message:"valid account",token:token})
        }
        else{
            res.send({message:"enter valid password",payload:[]})
        }


        

       
    }
})



app.post('/flashcard/post',async(req,res)=>{
    const FlashObj= app.get('FlashCollection');
    console.log(req.body)
    await FlashObj.insertOne(req.body);
    res.json("sucessfully posted");
})


//Get  Request

app.get('/flashcard/get',async(req,res)=>{
    const FlashObj=app.get('FlashCollection');
    let result=[];
    result=await FlashObj.find({}).toArray()
    // console.log("result"+result);
    if(result)
    res.send({meassage:"datasend",payload:result});
    else{
        res.send([]);
    }
})

app.post('/flashcard/del',async(req,res)=>{
    const FlashObj=app.get('FlashCollection');
    console.log("cont is"+req.body.questions)
    let result=await FlashObj.deleteOne({questions:req.body.questions})
    res.send({message:"deletion is done",payload:result})
})



app.post('/flashcard/verifytoken',async(req,res)=>{
    const token = req.body.token;
    console.log('token:'+req.body.token)
    const decodedToken = jwt.decode(token, { complete: true });
    console.log('Decoded Token:', decodedToken);
    try{
        let userdata=jwt.verify(token,'secretekey');
        console.log('tokenn valid:'+userdata)
        res.send({message:"tokenvalid"})

    }
    catch(err){
        console.log("token invalid");
        res.send({message:"tokennotvalid"});
    }
})