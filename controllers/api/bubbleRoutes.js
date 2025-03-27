const router = require('express').Router();
const { Bubble } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newBubble = await Bubble.create({
        ...req.body,
        user_id: req.session.user_id,
    });
  
      res.status(200).json(newBubble);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBubble = await Bubble.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (updatedBubble[0] > 0) {
      res.status(200).json({ message: 'Bubble updated successfully.' });
    } else {
      res.status(404).json({ message: 'Bubble not found or you are not authorized to update it.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
    const bubbleData = await Bubble.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bubbleData) {
      res.status(404).json({ message: 'No bubble found with this id!' });
      return;
    }

    res.status(200).json(bubbleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
