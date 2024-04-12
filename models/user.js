import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    user_name: { type: String, required: true, maxLength: 30 },
    first_name: { type: String, required: true, maxLength: 50 },
    last_name: { type: String, required: true, maxLength: 50 },
    email: { type: String, required: true, maxLength: 50 },
    password: { type: String, required: true, minLength: 8 },
})

UserSchema.virtual('url').get(function() {
  return `/users/${this._id}`;  
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;