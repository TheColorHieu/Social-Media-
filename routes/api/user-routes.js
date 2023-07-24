const router = require("express").Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

//here we are 
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
router.route('/userId/friends/friend:friendId').options(addFriend).delete(deleteFriend);
module.exports = router;