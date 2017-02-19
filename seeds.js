var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Pikachu Park",
        image: "http://vignette2.wikia.nocookie.net/pokemon/images/b/b1/025Pikachu_XY_anime_3.png/revision/latest?cb=20140902050035",
        description: "Electrifying greenery"
    },
    {
        name: "Rattata Ridge",
        image: "https://lh3.googleusercontent.com/-NQIWoCfR6Fk/Vy1a_-v6XPI/AAAAAAAAGSY/IJgz_KJ18EorX4M_fCyQgT6cJV00wesuACCo/s300/Screen%2Bshot%2B2016-05-06%2Bat%2B10.53.36%2BPM.png?refresh=900&resize_h=NaN&resize_w=NaN",
        description: "A nasty infestation"
    },
    {
        name: "Hypno Hill",
        image: "http://pokiidex.com/Content/Images/097_hypno.png",
        description: "Rolling hills that will put you in a trance"
    }
]

function seedDB() {
    Campground.remove({}).then(function() {
        console.log("removed campgrounds!");
        
        data.forEach(function(seed) {
            console.log("Added new Campground!");

            Campground.create(seed).then(function(campground) {
                Comment.create({
                        text: "This place is greate, but I wish there was internet",
                        author: "Einstein"
                        }).then(function(comment) {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }).catch(function(err) {
                            console.log(err);
                        });
            }).catch(function(err) {
                console.log(err);
            });
        });
    }).catch(function(err) {
        console.log(err); 
    });
}

module.exports = seedDB;
