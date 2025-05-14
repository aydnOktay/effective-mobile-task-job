const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,

    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        },
    ],
});

module.exports = mongoose.model("Admin", adminSchema);