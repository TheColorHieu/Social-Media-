const { Schema, model} = require('mongoose');
const Reaction = require('./reaction');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: string,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        userName: {
            type: string,
            required: true,
        },
        reactions: [reactions],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
ReactionSchema
.virtuals('getResponses')
//our getter
.get(function(){
    return this.tags.length;
});

const Thought = mongoose.model('Thought', toughtSchema);

module.exports = Thought;