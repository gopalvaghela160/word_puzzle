var puzzle = require('../models/adminmodel');
var user = require('../models/puz');
const storage = require('node-persist');
storage.init(/* options....*/);

// admin-login
exports.adminlogin = async (req, res) => {
    const check = await storage.getItem('login');
    if (check == undefined) {
        if (req.body.email == "admin@gmail.com" && req.body.password == "1234") {
            await storage.setItem('login', true)
            res.status(200).json({
                status: 200,
                massage: "login successfully"
            });
        }
        else {
            res.status(200).json({
                status: 200,
                massage: "check Email & password "
            });
        }
    }
    else {
        res.status(200).json({
            status: 200,
            massage: "plase login"
        });
    }
}

// logout
exports.adminlogout = async (req, res) => {
    await storage.clear();
    res.status(200).json({
        status: 200,
        massage: "You Are Logout"
    });
}

// insert
exports.insert = async (req, res) => {
    req.body.cat_image = req.file.originalname;
    var data = await puzzle.create(req.body);
    res.status(200).json({
        status: 200,
        message: "insert successfully",
        data
    })
}

// select
exports.select = async (req, res) => {
    var data = await puzzle.find();
    res.status(200).json({
        status: 200,
        message: "view all data",
        data
    })
}

// upadte-data
exports.update = async (req, res) => {
    var id = req.params.id;
    var data = await puzzle.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        status: 200,
        message: "update data",
        data
    })
}

// delete- data
exports.delete = async (req, res) => {
    var id = req.params.id;
    var data = await puzzle.findByIdAndDelete(id);
    res.status(200).json({
        status: 200,
        message: "delete data",
        data
    })
}

//------------------------------------ puzzle-userside -------------------------------------------

exports.insertpuzzle = async (req, res) => {

    const check = await storage.getItem('login');
    if (check != undefined) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let result = req.body.puz_ans;
        let len = (16 - result.length)
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        let arr = [];
        let val = "";
        for (let i = 0; i < 16; i++) {
            let ran = Math.floor(Math.random() * 16);
            if (arr.indexOf(ran) == -1) {
                arr.push(ran);
                val += result.charAt(ran);
            } else {
                i--;
            }
        }

        req.body.puz_image = req.file.originalname;
        req.body.skip_id = []
        req.body.win_id = [];
        req.body.puz_char = val;
        const data = await user.create(req.body);
        res.status(200).json({
            status: 200,
            message: "Puzzle Added Succesfully!!!"
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "plz login !"
        })
    }

}

exports.getpuzzle = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {
        const data = await puz.find()
        res.status(200).json({
            status: 200,
            message: "view all puzzle",
            data
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "plz login !"
        })
    }
}

exports.updatepuzzle = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {
        const data = await puz.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 200,
            message: "puzzle updates successfully",
            data
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "plz login !"
        })
    }
}

exports.deletepuzzle = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {
        var id = req.params.id;
        const data = await puz.findByIdAndUpdate(id)
        res.status(200).json({
            status: 200,
            message: "puzzle deleted successfully",
            data
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "plz login !"
        })
    }
}
