const mongoose = require("mongoose");

const sauceShema = mongoose.Schema({
    userId: { type: String, require: true},
    name: { type: String, require: true},
    manuFacturer: { type: String, require: true},
    description: { type: String, require: true},
    mainPepper: { type: String, require: true},
    imageUrl: { type: String, require: true},
    heat: { type: Number, require: true},
    likes: { type: Number},
    dislikes: { type: Number},
    userLiked: { type: [String]},
    userDisliked: { type: [String]},
});

module.exports = mongoose.model("sauce", sauceShema);