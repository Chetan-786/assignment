var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    Id: Number,
    name: String,
    address: String,
    dob: Date,
    state: String,
    createdAt: Date
}, { timestamps: true });

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;