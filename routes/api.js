import express from 'express';
import { userList,
        userDetail,
        createUserPost,
        deleteUser,
        updateUserPost,
        loginUser } from '../controllers/userController.js';

import { createMessage, messageList, messageDetail, deleteMessage } from '../controllers/messageController.js';

import { chatroomList, createChatroom, getChatroom, getChatroomByParticipants, updateChatroom, deleteChatroom } from '../controllers/ChatroomController.js';

import passport from 'passport';
import JwtStrategy from './strategies/jwt.js';
passport.use(JwtStrategy);

const router = express.Router();

// ROUTES FOR USERS //
/* GET User List. */
router.get('/users', userList);

/* GET User Detail. */
router.get('/users/:id', userDetail);

/* Post User Create. */
router.post('/users/create', createUserPost);

/* Delete User. */
router.delete('/users/:id/delete', deleteUser);

/* Update User Detail POST. */
router.post('/users/:id/update', updateUserPost);

/* Log In User POST */
router.post('/users/login', loginUser);

/* Testing Authentication Route */
router.get('/protected', passport.authenticate('jwt', { session: false}), (req, res, next) => {
        return res.send(req.user);
})

// ROUTES FOR MESSAGES //
/* GET Message List. */
router.get('/messages', messageList);

/* GET Message Detail. */
router.get('/messages/:id', messageDetail);

/* POST Message Create. */
router.post('/messages/create', createMessage);

/* Delete Message. */
router.delete('/messages/:id/delete', deleteMessage);

// ROUTES FOR CHATROOMS //
/* GET Chatroom List. */
router.get('/chatrooms', chatroomList);

/* GET Chatroom Details. */
router.get('/chatrooms/:id', getChatroom);

// GET Chatroom by Participants
router.get('/chatrooms/:participant1/:participant2', getChatroomByParticipants);

/* GET Chatroom Create. */
router.post('/chatrooms/create', createChatroom);

/* Delete Chatroom. */
router.delete('/chatrooms/:id/delete', deleteChatroom);

/* Update Chatroom. */
router.post('/chatrooms/:id/update', updateChatroom);

export default router;