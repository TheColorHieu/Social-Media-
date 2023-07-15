const { Schema, model,mongoose} = require('mongoose');
const ReactionSchema = require('./reaction');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtual: true,
        },
        id: false,
    }
);
ThoughtsSchema
.virtual('getResponses')
//our getter
.get(function(){
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtsSchema);

module.exports = Thought;