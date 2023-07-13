const {Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 25,
        },
        createAt: {
            type: Date,
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);