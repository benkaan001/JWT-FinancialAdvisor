const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please provide a name!'],
        min:[3,'Must have at least 3 characters.'],
        max:[25,'Cannot exceed 25 characters!'],
        trim: true,
    },
    email: {
        type: String,
        required:[true, 'Please provide an email!'],
        unique: true,
        match: [
            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 
            'Please provide a valid email!']
    },
    password: {
        type: String,
        required:[true, 'Please provide a valid password!'],
        min:[6,'Must have at least 6 characters.'],
    }
    
})
const User = mongoose.model('User', UserSchema);
module.exports = User;
