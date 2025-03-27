// routes/api/commentRoutes.js
const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log("req.session.user_id:", req.session.user_id);
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      bubble_id: req.body.bubble_id,
      user_id: req.session.user_id,
      date_created: new Date(), // Ensure date_created is set
    });

    // Fetch the newly created comment AND include the associated User data
    const commentWithUser = await Comment.findByPk(newComment.id, {
      include: [{ model: User, attributes: ['name'] }],
      attributes: ['content', 'date_created'], // Include the date_created field
    });

    res.status(200).json(commentWithUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
;

module.exports = router;