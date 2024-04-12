import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
    message: { type: String, required: true },
    author: { type:Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

MessageSchema.virtual('url').get(function() {
  return `/messages/${this._id}`;  
});

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;