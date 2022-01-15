const mongoose = require('mongoose');

const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todoapp-auth'
    },
    title: {
        type: String,
        required: true
    },
    desc: {
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

const Note = mongoose.model('todoapp-note', NoteSchema);


module.exports = {
    Note
}