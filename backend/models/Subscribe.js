const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        require: true
    }
});

module.exports = model('subscribe', schema);