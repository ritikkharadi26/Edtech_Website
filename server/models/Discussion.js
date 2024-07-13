const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subsection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Discussion", discussionSchema);
