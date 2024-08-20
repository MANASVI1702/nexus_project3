// contactSchema.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const ContactCollection = mongoose.model("ContactCollection", ContactSchema);

module.exports = ContactCollection;
