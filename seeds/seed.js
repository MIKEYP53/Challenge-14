const sequelize = require('../config/connection');
const { User, Bubble } = require('../models');

const userData = require('./userData.json');
const bubbleData = require('./bubbleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const bubble of bubbleData) {
    await Bubble.create({
      ...bubble,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
