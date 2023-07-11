const { application } = require('express');
const {Thought, User} = require('../models');

module.exports = {
    //here we will be invoking all fo the functions, then we will  return the results in a JSON 
    async getThoughts(req, res){
        try{
            const thoughts = await thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we will be getting a single application using the findOneandUpdate method
    async getSingleThoughts(req, res){
        try{
            const thoughts = await Thoughts.findOne({ _id: req.params.applicationId});

            if (!thoughts) {
                return res.status(404).json({ message: 'No application with that ID'});
            }
            res.json(thoughts);
            } catch (err) {
                res.status(500).json(err);
            }
        },
    //here we are creating a thought 
    async createThoughts(req, res){
        try{
            const thoughts = await Thoughts.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { applications: thoughts._id} },
                { new: true}
            );

            if (!user){
                return res.status(404).json({
                    message: 'A thought was created, but there was no ID with that user',
                })
            }
            res.json('Created the thought!!!');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //next we will be updating the thought
    async updateThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId},
                { $set: req.body},
                { runValidators: true, new:true}
            );

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //here we will be deleting the thought from the application 
    async deleteThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId});

            if(!thought) {
                return res.status(404).json({ message: 'No thought with this id!'})
            }
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtsId},
                { $pull: { thoughts: req.params.thoughtsId}  },
                { new: true }
            );
            if(!user) {
                return res.status(404).json({
                    message: "Thought created but no user with this id!",
                });
            }
            res.json({ message: 'Thought successfully deleted!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //here we will be adding a reaction 
    async addReaction(req, res){
        try{
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId},
                { $addToSet: { tags: req.body} },
                { runValidators: true, new: true}
            );
            if(!thoughts) {
                return res.status(404).json({ message: 'No Thought with this id!'});
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //next we will be removing the reaction 
    async removeReaction(req, res){
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $pull: { tags: { tagId: req.params.tagId} } },
                { runValidators: true, new: true}
            );

            if(!thoughts) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    };

