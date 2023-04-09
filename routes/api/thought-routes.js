const router = require('express').Router();

// import controller functions
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
      .get(getAllThoughts);
      
// /api/thoughts/:id
router.route('/:id')
       .get(getThoughtById)
       .put(updateThought)
       .delete(deleteThought);

// /api/thoughts/:userId
router.route('/:userId')
      .post(createThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
      .post(addReaction);

// /api/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
      .delete(deleteReaction);

module.exports = router;