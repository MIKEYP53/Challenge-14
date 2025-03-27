const User = require('./User');
const Bubble = require('./Bubble');
const Comment = require('./Comment');

User.hasMany(Bubble, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Bubble.hasMany(Comment, {
  foreignKey: 'bubble_id',
  onDelete: 'CASCADE'
});

Bubble.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Bubble, {
  foreignKey: 'bubble_id'
});


module.exports = { User, Bubble, Comment };
