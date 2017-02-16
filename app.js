var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [ 
    {name: "Salmon Creak", image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg"},
    {name: "Marble Hill", image: "http://i.telegraph.co.uk/multimedia/archive/01653/trericket_1653323c.jpg"},        
    {name: "Rocky Road", image: "http://esq.h-cdn.co/assets/15/28/980x653/gallery-1436200680-10-jumbo-rocks.jpg"},
    {name: "Salmon Creak", image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg"},
    {name: "Marble Hill", image: "http://i.telegraph.co.uk/multimedia/archive/01653/trericket_1653323c.jpg"},   
    {name: "Salmon Creak", image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg"},
    {name: "Marble Hill", image: "http://i.telegraph.co.uk/multimedia/archive/01653/trericket_1653323c.jpg"},   
    {name: "Salmon Creak", image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg"},
    {name: "Marble Hill", image: "http://i.telegraph.co.uk/multimedia/archive/01653/trericket_1653323c.jpg"},   
    {name: "Salmon Creak", image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg"},
    {name: "Marble Hill", image: "http://i.telegraph.co.uk/multimedia/archive/01653/trericket_1653323c.jpg"},   
    {name: "Salmon Creak", image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg"},
    {name: "Marble Hill", image: "http://i.telegraph.co.uk/multimedia/archive/01653/trericket_1653323c.jpg"},   
    {name: "Salmon Creak", image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/720x450/public/1443561122/CAMPING0915-Glacier-National-Park.jpg"},
    {name: "Marble Hill", image: "http://i.telegraph.co.uk/multimedia/archive/01653/trericket_1653323c.jpg"}
]

app.get('/', function(req, res) {
    res.render("landing");
});

app.get('/campgrounds', function(req, res) {
    res.render("campgrounds", {campgrounds, campgrounds});
});

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    
    res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});