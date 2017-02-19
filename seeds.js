var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
    {
        namme: "Pikachu Park",
        image: "http://vignette2.wikia.nocookie.net/pokemon/images/b/b1/025Pikachu_XY_anime_3.png/revision/latest?cb=20140902050035",
        description: "Electrifying greenery"
    },
    {
        namme: "Rattata Ridge",
        image: "https://lh3.googleusercontent.com/-NQIWoCfR6Fk/Vy1a_-v6XPI/AAAAAAAAGSY/IJgz_KJ18EorX4M_fCyQgT6cJV00wesuACCo/s300/Screen%2Bshot%2B2016-05-06%2Bat%2B10.53.36%2BPM.png?refresh=900&resize_h=NaN&resize_w=NaN",
        description: "A nasty infestation"
    },
    {
        namme: "Hypno Hill",
        image: "http://pokiidex.com/Content/Images/097_hypno.png",
        description: "Rolling hills that will put you in a trance"
    }
]

function seedDB() {
    Campground.remove({}).then(function() {
        console.log("removed campgrounds!");
        
        data.forEach(function(seed) {
            Campground.create(seed).then(function(data) {
                console.log("Campground added");
            }).catch(function(err) {
                console.log(err);
            });
        });
    }).catch(function(err) {
        console.log(err); 
    });
}

module.exports = seedDB;
