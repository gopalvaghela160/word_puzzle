var mongoose = require('mongoose');


const adminpuzzle = new mongoose.Schema({
    cat_name:{
        type:String,
        require:true
    },
    cat_image:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('puzzle',adminpuzzle);