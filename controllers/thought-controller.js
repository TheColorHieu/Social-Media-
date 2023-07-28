// const { Thought } = require('express');
const {Thoughts, Reaction} = require('../models');

module.exports = {
    //here we are getting all tof the thoughts 
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we are creating a thought 
    async createThought(req, res) {
        try {
            const thoughts = await Thoughts.create(req.body);
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we are getting a single thought
    async getSingleThought(req, res) {
        try{
            const thoughts = await Thoughts.findOne({ _id: req.params.thoughtId});
            if(!thoughts) {
                return res.status(404).json({ message: 'No thought with this id'});
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we are updating the thought
    async updateThought(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body},
                { runValidators: true, new: true}
            );
            if(!thoughts) {
                return res.status(404).json({ message: 'No thought with this id'});
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we are deleting the thought
    async deleteThought(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId});
            if(!thoughts) {
                return res.status(404).json({ message: 'No thought with this id'});
            }
            res.json({ message: 'Thought successfully deleted!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //next we will be working on the reactions 
    async addReaction(req, res) {
        try{
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: { reactions: req.body} },
                { runValidators: true, new: true}
            );
            if(!thoughts) {
                return res.status(404).json({ message: 'No thought with this id'});
            } else {
            res.json({message: "Reaction successfully added!"});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we are deleting the reaction
    async deleteReaction(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId} } },
                { runValidators: true, new: true}
            );
            if(!thoughts) {
                return res.status(404).json({ message: 'No thought with this id'});
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    }

};
