const User = require('../models/User');

exports.getHome = (req, res) => {
  res.render('home');
};