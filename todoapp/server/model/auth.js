const mongoose = require('mongoose');

const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true,
        default: date
    },
    time: {
        type: String,
        required: true,
        default: time
    },
})

const Auth = mongoose.model('todoapp-auth', AuthSchema);


module.exports = {
    Auth
}