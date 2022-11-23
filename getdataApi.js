var express=require("express");
var app=express();
const https=require("http");
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))

  app.get("/",(req,res)=>{
    const url="http://localhost:4000/show";
    https.get(url,(response)=>{
        response.on("data",(d)=>{
            data= JSON.parse(d)
            var final_data=d;
            res.send("<h2> "+final_data +"</h2>")
     })
   });
});
app.listen(5000,(req,res)=>{
  console.log("Server is running on port 5000")
});