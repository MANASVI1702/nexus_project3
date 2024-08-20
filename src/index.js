const express=require("express");
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const contactCollection = require("./contactSchema"); 

app.use(express.static('public'));
const tempelatePath=path.join(__dirname,'../tempelates')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())   
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.post("/signup",async (req,res)=>{

const data={
    name:req.body.name,
    password:req.body.password
}
await collection.insertMany([data])
res.render("home")
})

app.post("/contact", async (req, res) => {
    try {
        console.log(req.body);  // Log the received data

        const data = {
            name: req.body.name,
            message: req.body.message
        };

        await contactCollection.insertMany([data]);
        res.render("home");
    } catch (error) {
        console.log("Error inserting data:", error);
        res.send("There was an error submitting the data.");
    }
});



app.post("/login",async (req,res)=>{

    try{

        const check=await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")
    }
})
app.listen(3001,()=>{
    console.log("port connected");
})

