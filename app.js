const express = require("express")
const BodyParser = require("body-parser")
const mongoose =require("mongoose")

app = express()

app.use(BodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/WIKI-DB",{ useUnifiedTopology: true, useNewUrlParser: true })

const wiki_schema = {
  title:{
    type:String
  },
  content:{
    type:String
  }
}

const article = mongoose.model("article",wiki_schema);


app.route("/articles")

 .get(function(req,res){

   article.find({},function(err,found_data){
     if(!err){
       res.send(found_data)
     }
     else{
       res.send(err)
     }
   })
 })

 .post(function(req,res){
   //inserting data from a post request
   //from a form where the input fields has name title
   //and content which needs to be inserted

   //use postman to verify the working
   //set option to form urlencoded in post

   //console.log(req.body.title);
   //console.log(req.body.content);

   const new_document = article({
     title:req.body.title,
     content:req.body.content
   })

   new_document.save(function(err){
     if(!err){
       res.send("data inserted successfully")
     }
     else{
       res.send(err)
     }
   })
 })

 .delete(function(req,res){

   article.deleteMany({},function(err){
     if(!err){
       res.send("deleted entire collection")
     }
     else{
       res.send(err)
     }
   })
 });


app.route("/articles/:article_title")

 .get(function(req,res){
   article.findOne({title:req.params.article_title},function(err,found_data){
     if(!err){
       res.send(found_data)
     }
     else{
       res.send(err)
     }
   })
 })

 .put(function(req,res){
   article.update({title:req.params.article_title},{title:req.body.title,content:req.body.content},{overwrite:true},function(err){
     if(!err){
       res.send("updated")
     }
     else{
       res.send(err)
     }
   })
 })

 .patch(function(req,res){
   article.update({title:req.params.article_title},{$set:req.body},function(err){
     if(!err){
       res.send("updated")
     }
     else{
       res.send(err)
     }
   })
 })

.delete(function(req,res){
  article.deleteOne({title:req.params.article_title},function(err){
    if(!err){
      res.send("document deleted")
    }
    else{
      res.send(err)
    }
  })
})

app.listen(3000,function(req,res){
  console.log("server up and running at port 3000");
})
