const router = require('express').Router();
const { Bubble, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const bubbleData = await Bubble.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const bubbles = bubbleData.map((bubble) => bubble.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      bubbles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bubble/:id', async (req, res) => {
  console.log("bubble/:id route was hit!");
  try {
    const bubbleData = await Bubble.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name'], // Include username for comments
          },
        }
      ],
    });

    if (!bubbleData) {
      res.status(404).json({ message: 'No bubble found with this id!' });
      return;
    }

    const bubble = bubbleData.get({ plain: true });

    // Check if the logged-in user owns the bubble
    const user_owns_bubble = req.session.user_id === bubble.user_id;
    console.log('User owns bubble:', user_owns_bubble); // Add this line for debugging

    // Render the page and pass in the user ownership data
    res.render('bubble', {
      ...bubble,
      logged_in: req.session.logged_in,
      user_owns_bubble: user_owns_bubble, // Add this to indicate if the user owns the bubble
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bubble }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
