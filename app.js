//jshint esversion:6
//9vNkiRjbMaYPvSDg
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
mongoose.connect('mongodb+srv://kunalabhishek:9vNkiRjbMaYPvSDg@cluster0.kb7ykvn.mongodb.net/todolistDB');

const itemsSchema = new mongoose.Schema ({
  name: String
});

const Item = mongoose.model("item", itemsSchema)


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const item1 = new Item({name: "Welcome to todolist"});
const item2 = new Item({name: "<-- Hit this to delete item"});
const item3 = new Item({name: "Hit + button to add new item"});
const defaultItems = [item1, item2, item3];



app.get("/", function(req, res) {

  Item
    .find()
    .then(function (getItems){
    //   if(getItems.length === 0){
    //     Item
    //       .insertMany(defaultItems)
    //       .then(function (){
    //           console.log("Items inserted");
    //         });
    //   res.redirect("/");
    // } else {
      res.render("list", {listTitle: "Today", newListItems: getItems});
        // }
    });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item({name: itemName});
  item.save();
  res.redirect("/");
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  Item
    .findByIdAndRemove(checkedItemId)
    .then(function (){
      console.log("Item removed");
    });
  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
