import MessageModel from '../models/message.js';
import asyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';

// Display All Messages
const messageList = asyncHandler(async (req, res, next) => {
    const allMessages = await MessageModel.find({})
        .populate("author")
        .exec();
    res.send(allMessages);
});

// Display Single Message Details
const messageDetail = asyncHandler(async (req, res, next) => {
    const message = await MessageModel.findById(req.params.id)
        .populate("author")
        .exec();
    if (message === null) {
        const err = new Error("Message not found");
        err.status = 404;
        return next(err); 
    }
    res.send(message);
});

// Create Message
const createMessage = [
    body("message")
        .trim()
        .isLength({ min: 1})
        .escape()
        .withMessage("You must specify a message"),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new MessageModel({
            message: req.body.message,
            author: req.body.author,
        });

        if(!errors.isEmpty()) {
            res.send(errors);
            return;
        } else {
            await message.save();
            res.send(message);
        }
    })
]

// Handle Delete Message
const deleteMessage = asyncHandler(async (req, res, next) => {
    const deletedMessage = await MessageModel.findByIdAndDelete(req.params.id);
    res.send(deletedMessage);
});

export {
    createMessage,
    messageList,
    messageDetail,
    deleteMessage
};