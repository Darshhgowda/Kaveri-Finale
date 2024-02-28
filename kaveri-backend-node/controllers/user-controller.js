const {
    userModel
} = require('../model/user-model');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
    try {
        const response = await userModel.find();
        res.status(200).json({
            error: false,
            message: "Record Found",
            response,
        });
    } catch (err) {
        next(err);
    }
};


const login = async (req, res, next) => {
    try {
        const {
            userName,
            password
        } = req.body;
        const user = await userModel.findOne({
            userName,
        });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const payload = {
                    userName: user.userName,
                };
                const token = jwt.sign(payload, process.env.jwtSecret);
                res.status(200).json({
                    error: false,
                    message: "Login Successfull",
                    token,
                    user,
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "Invalid Password or Username",
                });
            }
        } else {
            res.status(400).json({
                error: true,
                message: "User Not Found",
            });
        }
    } catch (err) {
        next(err.message);
    }
};

const getUser = async (req, res, next) => {
    try {
        let id = req.params.id
        const response = await userModel.findById({
            _id: id,
        });
        res.status(200).json({
            error: false,
            message: "Record Found",
            response,
        });
    } catch (err) {
        next(err);
    }
};

const addUser = async (req, res, next) => {
    try {
        const {
            name,
            userName,
            phoneNo,
            role,
            password,
            place
        } = req.body;
        const user = await userModel.findOne({
            userName,
        });
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(password, salt);

            const response = await userModel.insertMany([{
                name: name.charAt(0).toUpperCase() + name.slice(1),
                userName,
                phoneNo,
                role,
                password:encryptedPassword,
                place
            }, ]);
            res.status(200).json({
                error: false,
                message: "Registered Successfully",
                response,
            });
        } else {
            res.status(401).json({
                error: true,
                message: "User already exists! Please login",
            });
        }
    } catch (err) {
        next(err);
    }
};

const editUser = async (req, res, next) => {
    try {
        const {
            name,
            userName,
            phoneNo,
            role,
            password,
            place
        } = req.body;
        await userModel.updateOne({
            _id: req.params.id,
        }, {
            $set: {
                name,
                userName,
                phoneNo,
                role,
                password,
                place
            },
        });
        const response = await userModel.findOne({
            _id: req.params.id,
        });
        res.status(200).json({
            error: false,
            message: "Details Updated Successfully",
            _id: req.params.id,
            response,
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await userModel.deleteOne({
            _id: req.params.id,
        });
        res.status(200).json({
            error: false,
            message: "User Deleted Successfully",
            _id: req.params.id,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllUsers,
    login,
    getUser,
    addUser,
    editUser,
    deleteUser
};