// import user model
const { User } = require('../models');

// create controllers for User
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get user by id
    getUserById({ params}, res) {
        User.findOne({_id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User has been found with that id'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    // create new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User has been found with that id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },

    // adding friends
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User has been found with that id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete users
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User has been found with that id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User has been found with that id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

// export controller
module.exports = userController;