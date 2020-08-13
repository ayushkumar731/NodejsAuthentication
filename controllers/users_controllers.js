module.exports.signUp = function (req, res) {
  return res.render('signUp', {
    title: 'SignUp Page',
  });
};

module.exports.signIn = function (req, res) {
  return res.render('signIn', {
    title: 'SignIn Page',
  });
};
