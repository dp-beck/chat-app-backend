import UserModel from '../models/user.js';
import asyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Display List of Users
const userList = asyncHandler(async (req, res, next) => {
    const allUsers = await UserModel.find({})
        .sort({ user_name: 1 })
        .exec();
    res.send(allUsers);
});

// Display Details of Single User
const userDetail = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.params.id).exec();
    if (user === null) {
        const err = new Error("User not found");
        err.status = 404;
        return next(err); 
    }
    res.send(user);
});

// Handle New User Sign Up on Post
const createUserPost = [
    body("first_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("First name must be specified"),
    body("last_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Last name must be specified"),
    body("user_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Username must be specified"),
    body("email")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Email must be specified"),
    body("password")
        .trim()
        .isLength({ min: 8 })
        .escape()
        .withMessage("Password must be atleast 8 characters"),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new UserModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: hashedPassword,
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            await user.save();
            res.send(user);
        }
    })
]

// Handle Delete User
const deleteUser = asyncHandler(async (req, res, next) => {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
});

// Handle Update form for User
const updateUserPost = [
    body("first_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("First name must be specified"),
    body("last_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Last name must be specified"),
    body("user_name")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Username must be specified"),
    body("email")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("Email must be specified"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        
        const user = new UserModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            email: req.body.email,
            _id: req.params.id
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, user, {});
            res.send(updatedUser);
        }
    })
];

// Handle Log In User 
const loginUser = asyncHandler(async (req, res, next) => {
    let { user_name, password } = req.body;
    const user = await UserModel.findOne({ user_name: user_name }).exec();
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    };

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
    };

    const secret = 'SECRET_KEY'; 
    const token = jwt.sign({ user_name: user.user_name }, secret, { expiresIn: "1hr" });
    
    return res.status(200).json({
        message: "Auth Passed",
        token
    });    
});

export {
    userList,
    userDetail,
    createUserPost,
    deleteUser,
    updateUserPost,
    loginUser
};