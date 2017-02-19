var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: {type: String, default: "No name"},
    image: {type: String, default: 'http://www.iff.co.il/wp-content/uploads/thumbs/placeholder-31xgmtgz24pcdnis2ltc7e.png'},
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);