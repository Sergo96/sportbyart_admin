const {Schema, model} = require('mongoose');

const schema = new Schema({
    about_us_title: {
        type: String,
        default: ''
    },
    about_us_content: {
        type: String,
        default: ''
    },
    about_us_author: {
        type: String,
        default: ''
    },
    about_us_author_image: {
        type: String,
        default: ''
    },
    about_us_image: {
        type: String,
        default: ''
    },
    email_username: {
        type: String,
        default: ''
    },
    email_password: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email_for_contact: {
        type: String,
        default: ''
    }
});

module.exports = model("settings", schema)