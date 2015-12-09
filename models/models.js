var mongoose = require('mongoose');

var twipSchema = new mongoose.Schema({
    twipname: String,
    password: String, //hash created from password
    twipped_at: {type: Date, default: Date.now}
});

var twitSchema = new mongoose.Schema({
    twipped_by: String,
    twipped_at: {type: Date, default: Date.now},
    t_text: String
});

mongoose.model('Twit', twitSchema);
mongoose.model('Twip', twipSchema);