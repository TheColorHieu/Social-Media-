const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {   
        
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true 
        },
        email: {
            type: String,
            required: "You need an email address to continue",
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//next we will be creating a virtual property of fullname that gets and sets the users name
userSchema
.virtual('fullName')
//our getter
.get(function () {
    return `${this.firstName} ${this.lastName}`;
})
//this is our setter
.set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last});
});

//we initial our user model 
const User = model('user', userSchema);
module.exports = User;