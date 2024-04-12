import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChatroomSchema = new Schema ({
    participants: [{ type:Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type:Schema.Types.ObjectId, ref: "Message" }],
}, { timestamps: true });

ChatroomSchema.virtual('url').get(function() {
  return `/chatrooms/${this._id}`;  
});

const ChatroomModel = mongoose.model("Chatroom", ChatroomSchema);

export default ChatroomModel;