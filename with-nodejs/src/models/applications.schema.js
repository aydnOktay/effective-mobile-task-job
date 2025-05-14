const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    email: { type: String },
    subject: { type: String },
    content: { type: String },
    status: {
        type: String,
        enum: ["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
        default: "NEW",
    },
    description: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin", 
        default: null,
    }
});

module.exports = mongoose.model("Application", applicationSchema);