const mongoose = require('mongoose');


const RegisterSchema = new mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    
});
module.exports = mongoose.model('register',RegisterSchema,'signs');