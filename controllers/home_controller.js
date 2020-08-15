//render the home page
module.exports.home = function (req, res) {
  //check if user is authenticated then render the profile page
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  //if user is not authenicated then redirect to home page
  return res.render('home', {
    title: 'Home Page',
  });
};
