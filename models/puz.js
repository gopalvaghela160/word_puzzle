var mongoose = require('mongoose');

const puzzleSchema =  new mongoose.Schema ({
    puz_name: {
        type: String,
    },
    puz_cat :{
        type: mongoose.Schema.Types.objectId,
        ref: "puzzle",
    },
    puz_ans: {
        type: String,
    },
    puz_char: {
        type: String,
    },
    puz_image: {
        type: String,
    },
    skip_id: {
        type: Array,
    },
    win_id: {
        type: Array,
    },
});

module.exports = mongoose.model('Game', puzzleSchema);