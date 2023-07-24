const { User, Thoughts} = require('../models');

module.exports = {
    //here we will be getting all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we are getting a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findONe({ _id: req.params.userId })
            .select('-__v');
            if(!user){
                return res.status(404).json({ message: 'No user with that ID'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we will be creating a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //next we will be deleting a user with the associated thoughts 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});
            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'})
            }
            await Thoughts.deleteMany({ _id: { $in: user.Thoughts}});
            res.json({ message: 'User and thougts apps deleted!'})
        } catch (err){
            res.status(500).json(err);
        }
    },
    //here we will be updating the users info 
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                {new: true, runValidators: true}
            );
            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId} },
                {new: true, runValidators: true}
            );
            res.json({ message: 'added friend successfully', user});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req , res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId} },
                { new: true, runValidators: true}
            );
            if(!user){
                return res.status(404).json({ message: "No user with this ID"});
            }
            res.json({ message: 'Friend removed '})
        } catch (err){
            res.status(500).json(err);
        }
    },
}