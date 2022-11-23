const express = require("express");
const app = express();
const https = require("https");
const bodyParser=require("body-parser");
const fs = require("fs");

var send;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + '/form.html')
})

  
function calculate(subject1 , subject2, subject3, subject4, subject5)
{

    let total = subject1 + subject2 + subject3 + subject4 + subject5;
    let avg = Math.round(total/3);

    let totalS = "Total marks secured by entered student is : " + total;
    let avgS = "Average marks secured by entered student is : " + avg;
    let ans = "";

    if(avg <= 33)
    {
       ans+="Grade of student is F.";
    }
    else if(avg > 33 && avg <=50)
    {
        ans+="Grade of student is E.";
    }
    else if(avg > 50 && avg <=60)
    {
        ans+="Grade of student is D.";
    }
    else if(avg > 60 && avg <=70)
    {
        ans+="Grade of student is C.";
    }
    else if(avg > 70 && avg <=90)
    {
        ans+="Grade of student is B.";
    }
    else if(avg > 90)
    {
        ans+="Grade of student is A.";
    }

    return { totalS, avgS, ans };
}

app.post("/addapi",function(req,res)
{
    let userid = req.body.userid;
    let name = req.body.username;
    let address = req.body.address;
    let python = Number(req.body.python);
    let java = Number(req.body.java);
    let cpp = Number(req.body.cpp);
    let frontend = Number(req.body.frontend);
    let backend = Number(req.body.backend);
    let { totalS, avgS, ans } = calculate(python, java, cpp, frontend, backend);

    console.log(totalS, avgS, ans);

    send = {
        statusCode:200,
        userid:userid,
        name:name,
        address:address,
        python:python,
        java:java,
        cpp:cpp,
        frontend:frontend,
        backend:backend,
        total: totalS,
        avg: avgS,
        grade: ans,   
    }

    var data = JSON.stringify(req.body);
    fs.appendFile('st1.json', data+ ", ", err=>{
        if(err){
            throw err
        }
        console.log("File is updated")
        res.sendFile(__dirname + "/st1.json");
    })

    console.log(send)
    res.send("check data in terminal");
})

app.get("/show",function(req,res)
{
    res.send(send)    
})

app.listen(4000);