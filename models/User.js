const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
// add mongoose 'pre' middleware !!!!!!!! use function expression NOT => this !!!!!!!
// no need to pass in next as long as we are using async/await syntax per docs
UserSchema.pre('save', async function(next){    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
