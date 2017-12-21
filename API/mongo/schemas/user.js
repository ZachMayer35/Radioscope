import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    id: String,
    name: String,
    profile: Object
});

module.exports = mongoose.model('UserProfile', userProfileSchema);