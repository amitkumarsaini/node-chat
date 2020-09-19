var mongoose = require('mongoose');
var msgSchema = mongoose.Schema({
    message: { type: String, required: true },
    from: { type: String, required: true },
    group: { type: String },
    seen: { type: Boolean },
    reciver: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var MsgSchema = mongoose.model('msgSchema', msgSchema);

module.exports = MsgSchema;