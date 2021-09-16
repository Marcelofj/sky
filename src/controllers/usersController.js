const User = require('../models/user');

module.exports.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (User) {
      res.status(200).json({ user });
    } else {
      res.status(400).send('This User does not exist');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
